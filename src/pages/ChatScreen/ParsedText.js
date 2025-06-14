import React from 'react';
import {Text, Linking, StyleSheet} from 'react-native';

const ParsedText = ({text}) => {
  const lines = text.split('\n');

  return (
    <Text style={styles.responseText}>
      {lines.map((line, index) => {
        if (
          line.trim().startsWith('Product name') ||
          line.trim().startsWith('A short description') ||
          line.trim().startsWith('Suitable skin types') ||
          line.trim().startsWith('A link')
        ) {
          return (
            <Text key={index} style={styles.subTitleText}>
              {line + '\n'}
            </Text>
          );
        } else if (line.startsWith('http')) {
          return (
            <Text
              key={index}
              style={styles.linkText}
              onPress={() => Linking.openURL(line.trim())}>
              {line + '\n'}
            </Text>
          );
        } else {
          return line + '\n';
        }
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: 'black',
  },
  subTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

export default ParsedText;
