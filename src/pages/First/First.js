import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './First.style';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button';

import { getApp } from '@react-native-firebase/app';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

const First = ({ navigation }) => {
  useEffect(() => {
    const app = getApp();
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, user => {
      // Burada navigation.replace('Welcome') kaldırıldı
      // Yönlendirme App.js'de yapılacak
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={['#f9c5d1', '#cdeff0', '#d3cce3']}
      style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../../assets/avatar.png')}
          style={styles.avatar}
        />
      </View>

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        Even seamlessly acne detection for you
      </Text>
      <Button title="Let's go" onPress={handleLogin} />
    </LinearGradient>
  );
};

export default First;
