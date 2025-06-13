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

import { API_KEY, API_SECRET } from '@env';

const avatarOptions = {avatar1, avatar2, avatar3};

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
        console.error('Failed to fetch user data:', error);
      }
    })();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'Camera permission is required to take photos',
          buttonPositive: 'OK',
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
      console.error('Base64 conversion error:', error);
      return null;
    }
  };

  const analyzeSkin = async base64Image => {
    setLoadingAnalysis(true);
    setAlertMessage('Analyzing...');
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
      console.log('Skin analysis data from API:', data);

      if (data.error_message) {
        setAlertType('error');
        setAlertMessage(`API Error: ${data.error_message}`);
        return null;
      }

      setSkinAnalysisResult(data);
      setAlertType('success');
      setAlertMessage('Skin analysis completed.');
      return data;
    } catch (error) {
      setAlertType('error');
      setAlertMessage('An error occurred during analysis.');
      console.error('API call error:', error);
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

    // Minimum size check
    const MIN_WIDTH = 200;
    const MIN_HEIGHT = 200;

    if (width < MIN_WIDTH || height < MIN_HEIGHT) {
      setAlertType('error');
      setAlertMessage(
        `Image size is too small. Minimum size is ${MIN_WIDTH}x${MIN_HEIGHT}.`,
      );
      setAlertVisible(true);
      return;
    }

    if (!base64) {
      setAlertType('error');
      setAlertMessage('Failed to get data in base64 format.');
      setAlertVisible(true);
      return;
    }

    setPhotoUri(uri);
    setAlertMessage(
      asset.sourceURL ? 'Photo selected from gallery.' : 'Photo taken.',
    );
    setAlertVisible(true);

    // Send base64 string (without prefix) directly to API
    await analyzeSkin(base64);
  };

  const openCamera = async () => {
    if (!(await requestCameraPermission())) {
      Alert.alert('Permission Denied', 'Camera permission is required.');
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
      console.error('Logout error:', error);
      Alert.alert('Error', 'Logout failed.');
    }
  };

  // Create message based on acne level and confidence
  const getAcneLevelLabel = acneData => {
    const {confidence, value} = acneData;

    // Confidence value is just for interpretation
    // Show only severity level to user
    return mapAcneValue(value);
  };

  const mapAcneValue = value => {
    switch (value) {
      case 0:
        return 'None';
      case 1:
      case 2:
        return 'Moderate';
      case 3:
        return 'Severe';
      case 4:
        return 'Very Severe';
      default:
        return `Undefined level (${value})`;
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
            <Text style={{marginTop: 10}}>Analyzing...</Text>
          )}
          {!loadingAnalysis && skinAnalysisResult?.result?.acne && (
            <View style={styles.analysisContainer}>
              <Text style={styles.analysisTitle}>Skin Analysis Result</Text>
              <View style={styles.resultBox}>
                <Text style={styles.resultLabel}>
                  Acne Level:{' '}
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
              <Text>Camera</Text>
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
              <Text>Gallery</Text>
            </View>
          </TouchableOpacity>
        </CustomAlert>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
