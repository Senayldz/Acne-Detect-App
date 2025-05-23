import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './SignUp.style';

import { auth } from '../../../firebase';
import { createUserWithEmailAndPassword } from '@react-native-firebase/auth';

import eyeOpenIcon from '../../../assets/open-eye.png';
import eyeCloseIcon from '../../../assets/close-eye.png';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateForm = () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Hata', 'Tüm alanlar doldurulmalıdır.');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalı.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler uyuşmuyor.');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Hata', 'Email ve şifre gereklidir');
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      Alert.alert('Başarılı', `Kayıt oldunuz: ${userCredential.user.email}`);
      navigation.navigate('Home');
    } catch (error) {
      let errorMessage = 'Kayıt başarısız';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Bu email zaten kullanılıyor';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Geçersiz email';
          break;
        case 'auth/weak-password':
          errorMessage = 'Şifre en az 6 karakter olmalı';
          break;
      }
      Alert.alert('Hata', errorMessage);
    } finally {
      setIsLoading(false); // ✅ BURASI ÖNEMLİ
    }
  };

  return (
    <LinearGradient
      colors={['#f9c5d1', '#cdeff0', '#d3cce3']}
      style={styles.container}>
      <Text style={styles.title}>Hesap Oluştur</Text>

      <TextInput
        style={styles.input}
        placeholder="E-posta"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Şifre"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Image
            source={passwordVisible ? eyeOpenIcon : eyeCloseIcon}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Şifreyi Onayla"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!passwordVisible}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#c3aee9" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.signupLink}
        onPress={() => navigation.navigate('Login')}>
        <Text>
          Zaten hesabınız var mı?{' '}
          <Text style={styles.signupText}>Giriş Yap</Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SignUp;
