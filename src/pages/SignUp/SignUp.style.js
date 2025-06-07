import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9c5d1',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#e0d7ec',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e0d7ec',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingVertical: 0,
  },
  eyeIconWrapper: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: '#999',
  },
  button: {
    backgroundColor: '#c3aee9',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  signupText: {
    color: '#c3aee9',
    fontWeight: 'bold',
  },
});
