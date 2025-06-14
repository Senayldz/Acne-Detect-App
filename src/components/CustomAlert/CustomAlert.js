import React from 'react';
import {Modal, View, Text} from 'react-native';
import styles from './CustomAlert.style';
import Button from '../Button';

const CustomAlert = ({
  visible,
  type = 'info',
  message,
  onClose,
  children,
  showButton = true, // Yeni prop, buton gösterilsin mi?
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose ? onClose : () => {}}>
      <View style={styles.overlay}>
        <View style={[styles.alertBox, styles[type]]}>
          <Text style={styles.message}>{message}</Text>
          {children}
          {showButton && onClose && (
            <Button
              title="Okay"
              onPress={onClose}
              style={{width: 100, height: 44}}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
