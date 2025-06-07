import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(145, 145, 145, 0.5)',
    borderRadius: 25,
  },
  input: {
    flex: 1,
    paddingHorizontal: 13,
    paddingVertical: 10,
    fontSize: 16,
    color: '#383838',
    margin: 2,
  },
  toggle: {
    paddingHorizontal: 12,
    fontSize: 18,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
  iconImage: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
});
