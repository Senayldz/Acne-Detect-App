import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // Yarı saydam karartma
    justifyContent: 'center', // Dikey ortala
    alignItems: 'center', // Yatay ortala
  },
  alertBox: {
    backgroundColor: '#fff', // Kutunun arka planı beyaz
    padding: 20,
    borderRadius: 16,
    width: '80%', // Genişlik ayarı
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8, // Android gölge
    alignItems: 'center',
    justifyContent: 'center', // İçerikleri tam ortala
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center', // Yatay merkezleme
    textAlignVertical: 'center', // Android için dikey merkezleme
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6a5acd',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    flexDirection: 'row', // İkon ve yazı yan yana
    justifyContent: 'center', // Ortala
    alignItems: 'center', // Ortala
  },
  buttonText: {
    color: '#666', // Siyahın daha açık tonu
    fontWeight: '600',
    fontSize: 13, // Küçültülmüş yazı boyutu
    marginLeft: 8, // İkon ile yazı arasına boşluk
  },
  // Tip bazlı arka plan renkleri
  error: { backgroundColor: '#fdecea' },
  success: { backgroundColor: '#e6f4ea' },
  warning: { backgroundColor: '#fff4e5' },
  info: { backgroundColor: '#e8f0fe' },
});