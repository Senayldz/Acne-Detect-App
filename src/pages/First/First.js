import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './First.style';
import LinearGradient from 'react-native-linear-gradient';
const First = ({navigation}) => {
  return (
    <LinearGradient
      colors={['#f9c5d1', '#cdeff0', '#d3cce3']} // pastel pembe, yeşil, mor tonları
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Let's go</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default First;
