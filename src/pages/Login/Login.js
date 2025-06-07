import React, { useState } from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import styles from './Login.style';

// Modüler import
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';

import Input from '../../components/Input/Input';
import Button from '../../components/Button';
import CustomAlert from '../../components/CustomAlert/CustomAlert';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setAlertVisible(true);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showAlert('error', 'Email and password are required.');
      return;
    }

    setIsLoading(true);

    try {
      const app = getApp();
      const auth = getAuth(app);

      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());

      showAlert('success', `Welcome, ${userCredential.user.email}`);

      // Giriş başarılıysa Welcome ekranına geçiş yap
      //navigation.replace('Welcome');

    } catch (error) {
      let errorMessage = 'Login failed.';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'User not found.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
      }
      showAlert('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#f9c5d1', '#cdeff0', '#d3cce3']} style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <CustomAlert
        visible={alertVisible}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlertVisible(false)}
      />

      <Input
        label="Email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        label="Password"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!passwordVisible}
        togglePasswordVisibility={() => setPasswordVisible(!passwordVisible)}
        passwordVisible={passwordVisible}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#c3aee9" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}

      <TouchableOpacity
        style={styles.signupLink}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text>
          Don’t you have an account? <Text style={styles.signupText}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Login;
