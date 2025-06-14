import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, ScrollView, Linking } from 'react-native';
import axios from 'axios';
import styles from './ChatScreen.style';

const OPENAI_API_KEY = '...';

const ParsedText = ({ text }) => {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);

  return (
    <Text style={styles.responseText}>
      {parts.map((part, index) =>
        part.startsWith('http') ? (
          <Text
            key={index}
            style={styles.linkText}
            onPress={() => Linking.openURL(part)}
          >
            {part}
          </Text>
        ) : (
          part
        ),
      )}
    </Text>
  );
};

const ChatScreen = ({ route }) => {
  const { analysisResult } = route.params;
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (analysisResult) {
      const acneLevel = analysisResult?.result?.acne?.value;
      const acneText = mapAcneValue(acneLevel);
      const prompt = `The user's skin analysis result shows acne level: "${acneText}". Please recommend 3 to 5 popular and effective skincare products suitable for this acne level. For each product, provide:
- Product name
- A short description
- Suitable skin types
- A link where the product can be purchased online

Please provide the response in English.`;

      const fetchAdvice = async () => {
        setLoading(true);
        try {
          const res = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-3.5-turbo',
              messages: [
                { role: 'system', content: 'You are a dermatologist.' },
                { role: 'user', content: prompt },
              ],
              temperature: 0.7,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`,
              },
            },
          );

          const reply = res.data.choices?.[0]?.message?.content;
          setResponseText(reply || 'No response received.');
        } catch (error) {
          console.error('OpenAI API error:', error);
          Alert.alert(
            'Error',
            'An error occurred while fetching product recommendations. Please try again.',
          );
          setResponseText('An error occurred. No response received.');
        } finally {
          setLoading(false);
        }
      };

      fetchAdvice();
    }
  }, [analysisResult]);

  const mapAcneValue = (value) => {
    switch (value) {
      case 0:
        return 'None';
      case 1:
      case 2:
        return 'Moderate';
      case 3:
        return 'Severe';
      case 4:
        return 'Very Severe';
      default:
        return `Undefined level (${value})`;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Skin Care Recommendations</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#c3aee9" />
        </View>
      ) : (
        <ParsedText text={responseText} />
      )}
    </ScrollView>
  );
};

export default ChatScreen;
