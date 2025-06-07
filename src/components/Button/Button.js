import React from 'react';
import { Text, ActivityIndicator, TouchableOpacity, View, Image } from 'react-native';
import styles from './Button.style';

const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  textStyle,
  style,
  icon,       // Yeni prop: icon için image kaynağı
  iconStyle,  // İkona özel stil (boyut, margin vs.)
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton, style]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {icon && <Image source={icon} style={[{ width: 20, height: 20, marginRight: 8 }, iconStyle]} />}
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
