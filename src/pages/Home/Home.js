import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {getApp} from '@react-native-firebase/app';
import {getAuth} from '@react-native-firebase/auth';
import {getFirestore, doc, getDoc} from '@react-native-firebase/firestore';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

import styles from './Home.style';
import Button from '../../components/Button';
import CustomAlert from '../../components/CustomAlert';

import avatar1 from '../../../assets/avatar1.png';
import avatar2 from '../../../assets/avatar2.png';
import avatar3 from '../../../assets/avatar3.png';
import cameraIcon from '../../../assets/camera.png';
import logout from '../../../assets/logout.png';
import gallery from '../../../assets/gallery.png';

const avatarOptions = {avatar1, avatar2, avatar3};

const API_KEY = 'XrYtRhKyoSMY0DOo25BacBvetXI9wDqU';
const API_SECRET = '0aLsdX1tj_oAWZ-2rNxIehWk7DDaHMFt';

const Home = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [avatarKey, setAvatarKey] = useState('avatar1');
  const [photoUri, setPhotoUri] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info');
  const [showScanOptions, setShowScanOptions] = useState(false);
  const [skinAnalysisResult, setSkinAnalysisResult] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // Fetch user data once on mount
  useEffect(() => {
    (async () => {
      try {
        const app = getApp();
        const auth = getAuth(app);
        const firestore = getFirestore(app);
        const user = auth.currentUser;

        if (user) {
          const userRef = doc(firestore, 'users', user.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFirstName(data.firstName ?? 'User');
            setAvatarKey(data.avatar ?? 'avatar1');
          }
        }
      } catch (error) {
        console.error('Kullanıcı verisi alınamadı:', error);
      }
    })();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Kamera İzni',
          message: 'Fotoğraf çekmek için kamera izni gerekli',
          buttonPositive: 'Tamam',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.warn(error);
      return false;
    }
  };

  const convertToBase64 = async uri => {
    try {
      return await RNFS.readFile(uri, 'base64');
    } catch (error) {
      console.error('Base64 dönüşüm hatası:', error);
      return null;
    }
  };

  const analyzeSkin = async base64Image => {
    setLoadingAnalysis(true);
    setAlertMessage('Analiz yapılıyor...');
    setAlertType('info');
    setAlertVisible(true);

    const formData = new FormData();
    formData.append('api_key', API_KEY);
    formData.append('api_secret', API_SECRET);
    formData.append('image_base64', base64Image);

    try {
      const response = await fetch(
        'https://api-us.faceplusplus.com/facepp/v1/skinanalyze',
        {
          method: 'POST',
          headers: {Accept: 'application/json'},
          body: formData,
        },
      );

      const data = await response.json();
      console.log('API’den gelen cilt analizi verisi:', data);

      if (data.error_message) {
        setAlertType('error');
        setAlertMessage(`API Hatası: ${data.error_message}`);
        return null;
      }

      setSkinAnalysisResult(data);
      setAlertType('success');
      setAlertMessage('Cilt analizi tamamlandı.');
      return data;
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Analiz sırasında bir hata oluştu.');
      console.error('API çağrısı hatası:', error);
      return null;
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const handleImagePick = async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }
    if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
      return;
    }

    const asset = response.assets?.[0];
    if (!asset) return;

    const {uri, width, height, base64} = asset;

    // Minimum boyut kontrolü
    const MIN_WIDTH = 200;
    const MIN_HEIGHT = 200;

    if (width < MIN_WIDTH || height < MIN_HEIGHT) {
      setAlertType('error');
      setAlertMessage(
        `Resim boyutu çok küçük. Minimum ${MIN_WIDTH}x${MIN_HEIGHT} olmalı.`,
      );
      setAlertVisible(true);
      return;
    }

    if (!base64) {
      setAlertType('error');
      setAlertMessage('Base64 formatında veri alınamadı.');
      setAlertVisible(true);
      return;
    }

    setPhotoUri(uri);
    setAlertMessage(
      asset.sourceURL ? 'Galeriden fotoğraf seçildi.' : 'Fotoğraf çekildi.',
    );
    setAlertVisible(true);

    // API'ye direkt base64 kodu gönderiyoruz (prefix olmadan)
    await analyzeSkin(base64);
  };

  const openCamera = async () => {
    if (!(await requestCameraPermission())) {
      Alert.alert('İzin Reddedildi', 'Kamera izni gerekli.');
      return;
    }

    launchCamera({mediaType: 'photo', includeBase64: true}, handleImagePick);
  };

  const openGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo', includeBase64: true},
      handleImagePick,
    );
  };

  const handleScan = () => {
    // Reset states before opening options
    setAlertVisible(false);
    setAlertMessage('');
    setPhotoUri(null);
    setSkinAnalysisResult(null);
    setLoadingAnalysis(false);

    setShowScanOptions(true);
  };

  const closeAnalysisAlert = () => {
    setAlertVisible(false);
    setAlertMessage('');
    setPhotoUri(null);
    setSkinAnalysisResult(null);
  };

  const handleOptionSelect = option => {
    setShowScanOptions(false);
    option === 'camera' ? openCamera() : openGallery();
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth(getApp());
      await auth.signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Çıkış hatası:', error);
      Alert.alert('Hata', 'Çıkış işlemi başarısız oldu.');
    }
  };

  // Acne seviyesi ve confidence değerine göre mesaj oluşturma fonksiyonu
  const getAcneLevelLabel = acneData => {
    const {confidence, value} = acneData;

    // Confidence değeri sadece yorumlama için
    // Kullanıcıya sadece şiddet seviyesini göster
    return mapAcneValue(value);
  };

  const mapAcneValue = value => {
    switch (value) {
      case 0:
        return 'Yok';
      case 1:
      case 2:
        return 'Orta';
      case 3:
        return 'Şiddetli';
      case 4:
        return 'Çok Şiddetli';
      default:
        return `Tanımsız seviye (${value})`;
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello {firstName} 👋</Text>
            <Text style={styles.subGreeting}>
              How is your skin feeling today?
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}>
              <Image source={logout} style={{width: 28, height: 28}} />
            </TouchableOpacity>
            <Image source={avatarOptions[avatarKey]} style={styles.avatar} />
          </View>
        </View>

        {/* Scan Your Face Button */}
        <Button
          title="Scan Your Face"
          onPress={handleScan}
          style={styles.scanButton}
          textStyle={{fontSize: 16}}
          icon={cameraIcon}
          iconStyle={{width: 24, height: 24}}
        />

        {/* Analysis Result Alert */}
        <CustomAlert
          visible={alertVisible}
          type={alertType}
          message={alertMessage}
          onClose={closeAnalysisAlert}>
          {photoUri && (
            <Image
              source={{uri: photoUri}}
              resizeMode="cover"
              style={{width: 250, height: 200, borderRadius: 10, marginTop: 10}}
            />
          )}

          {loadingAnalysis && (
            <Text style={{marginTop: 10}}>Analiz yapılıyor...</Text>
          )}
          {!loadingAnalysis && skinAnalysisResult?.result?.acne && (
            <View style={styles.analysisContainer}>
              <Text style={styles.analysisTitle}>Cilt Analiz Sonucu</Text>
              <View style={styles.resultBox}>
                <Text style={styles.resultLabel}>
                  Sivilce Seviyesi:{' '}
                  {getAcneLevelLabel(skinAnalysisResult.result.acne)}
                </Text>
              </View>
            </View>
          )}
        </CustomAlert>

        {/* Scan Options Alert */}
        <CustomAlert
          visible={showScanOptions}
          type="info"
          message="Select Image Source"
          onClose={() => setShowScanOptions(false)}>
          <TouchableOpacity
            onPress={() => handleOptionSelect('camera')}
            style={{marginVertical: 10, alignSelf: 'stretch'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={cameraIcon}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <Text>Kamera</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOptionSelect('gallery')}
            style={{marginVertical: 10, alignSelf: 'stretch'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={gallery}
                style={{width: 24, height: 24, marginRight: 10}}
              />
              <Text>Galeri</Text>
            </View>
          </TouchableOpacity>
        </CustomAlert>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
