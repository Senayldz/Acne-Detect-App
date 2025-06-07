import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  softBackground: {
    backgroundColor: '#f5f7fa', // Soft açık mavi-gri
  },
  finishedContainer: {
    backgroundColor: '#eaf3f7',
    alignItems: 'center',
  },
  question: {
    fontSize: 22,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 25,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  optionButton: {
    backgroundColor: '#a3cef1',
    padding: 15,
    borderRadius: 25,
    marginVertical: 8,
    shadowColor: '#34495e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    color: '#2c3e50',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  result: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2980b9',
    marginVertical: 25,
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#bdc3c7',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#2980b9',
  },
});
