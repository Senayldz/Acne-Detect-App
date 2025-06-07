import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatScreen = ({ route }) => {
  const { analysisResult } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Asistan 🤖</Text>
      <Text style={styles.analysis}>{analysisResult}</Text>
      <Text style={styles.response}>
        Merhaba! Analizine göre bazı önerilerim olabilir. Günlük bakım rutinine dikkat etmeye ne dersin?
      </Text>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  analysis: {
    fontSize: 18,
    marginBottom: 16,
    color: '#5A45FF',
  },
  response: {
    fontSize: 16,
    color: '#333',
  },
});
