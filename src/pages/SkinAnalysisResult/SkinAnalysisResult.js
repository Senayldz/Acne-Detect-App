import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../../components/CustomAlert';

const SkinAnalysisResult = ({ analysisResult }) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (!analysisResult) {
      navigation.navigate('ChatScreen');
    }
  }, [analysisResult, navigation]);

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  if (!analysisResult) {
    return null;
  }

  const { skinType, details } = analysisResult;
  const capitalizedSkinType = skinType
    ? skinType.charAt(0).toUpperCase() + skinType.slice(1)
    : '';

  return (
    <View style={styles.container}>
      {/* ANALİZ SONUCU */}
      <Text style={styles.title}>Cilt Analizi Sonuçlarınız</Text>
      <Text style={styles.label}>
        Cilt Tipi: <Text style={styles.value}>{capitalizedSkinType || 'Bilinmiyor'}</Text>
      </Text>
      <Text style={styles.label}>
        Detaylar: <Text style={styles.value}>{details || 'Detay yok.'}</Text>
      </Text>

      {/* ALERT */}
      <CustomAlert
        visible={!!analysisResult && showAlert}
        type="info"
        message="Analiz tamamlandı!"
        onClose={handleAlertClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginTop: 6,
  },
  value: {
    fontWeight: '600',
  },
});

export default SkinAnalysisResult;
