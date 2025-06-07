import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 30,
    backgroundColor: '#f9f9fb',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#444',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    height: 50,
    borderColor: '#e0d7ec',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
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
    fontSize: 16,
    color: '#333',
  },

  toggle: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: '#6a5acd',
  },

  button: {
    backgroundColor: '#6a5acd',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#6a5acd',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  signupLink: {
    marginTop: 24,
    alignItems: 'center',
  },

  signupText: {
    color: '#c3aee9',
    fontWeight: '700',
  },
});
