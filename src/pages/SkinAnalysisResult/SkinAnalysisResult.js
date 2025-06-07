import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';

const searchKeywords = {
  dry: 'moisturizer',
  oily: 'oil control',
  sensitive: 'gentle',
  normal: 'daily care',
};

const SkinAnalysisResult = ({analysisResult}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!analysisResult) return;

    const keyword = searchKeywords[analysisResult.skinType];
    if (!keyword) {
      setError('Geçersiz cilt tipi.');
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    // Mock ürün listesi
    const mockProducts = [
      {
        product_id: 1,
        display_name: 'Nemlendirici Krem',
        description: 'Cildi nemlendirir.',
      },
      {
        product_id: 2,
        display_name: 'Yağ Kontrol Serumu',
        description: 'Yağlanmayı dengeler.',
      },
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, [analysisResult]);

  if (!analysisResult) {
    return <Text style={styles.info}>Henüz analiz yapılmadı.</Text>;
  }

  const {skinType, details} = analysisResult;
  const capitalizedSkinType = skinType
    ? skinType.charAt(0).toUpperCase() + skinType.slice(1)
    : '';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cilt Analizi Sonuçlarınız</Text>
      <Text style={styles.label}>
        Cilt Tipi:{' '}
        <Text style={styles.value}>{capitalizedSkinType || 'Bilinmiyor'}</Text>
      </Text>
      <Text style={styles.label}>
        Detaylar: <Text style={styles.value}>{details || 'Detay yok.'}</Text>
      </Text>

      <Text style={[styles.title, {marginTop: 20}]}>Önerilen Ürünler</Text>

      {loading && <ActivityIndicator size="large" color="#000" />}
      {error && <Text style={styles.error}>Hata: {error}</Text>}

      {!loading &&
        !error &&
        (products.length > 0 ? (
          <FlatList
            data={products}
            keyExtractor={item => item.product_id.toString()}
            renderItem={({item}) => (
              <View style={styles.productItem}>
                <Text style={styles.productName}>{item.display_name}</Text>
                <Text style={styles.productDescription}>
                  {item.description || 'Açıklama yok.'}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text>Maalesef ürün önerisi bulunamadı.</Text>
        ))}
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
  error: {
    color: 'red',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  productItem: {
    marginVertical: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default SkinAnalysisResult;
