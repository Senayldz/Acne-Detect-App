import React from 'react';
import {View, TextInput, Text, TouchableOpacity, Image} from 'react-native';
import styles from './Input.style';

//import eye icons
import eyeOpenIcon from '../../../assets/open-eye.png';
import eyeCloseIcon from '../../../assets/close-eye.png';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  style,
  togglePasswordVisibility,
  passwordVisible,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !passwordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {togglePasswordVisibility && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={passwordVisible ? eyeOpenIcon : eyeCloseIcon}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;
