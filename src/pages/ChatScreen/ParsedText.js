import React from 'react';
import { Text, Linking } from 'react-native';
import styles from './ChatScreen.style';

const ParsedText = ({ text }) => {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);

  return (
    <Text style={styles.responseText}>
      {parts.map((part, index) => {
        if (part.startsWith('http')) {
          return (
            <Text
              key={index}
              style={styles.linkText}
              onPress={() => Linking.openURL(part)}
            >
              {part}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
};

export default ParsedText;
