import React, {useState} from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// import style
import styles from './SignUp.style';

// import firebase
//import {auth, firestore} from '../../../firebase';
import {getApp} from '@react-native-firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

// import components
import Input from '../../components/Input/Input';
import Button from '../../components/Button';
import CustomAlert from '../../components/CustomAlert/CustomAlert';

const SignUp = ({navigation}) => {
  //name states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  //firebase initial
  const app = getApp(); // default app instance
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  // Custom alert states
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [alertMessage, setAlertMessage] = useState('');

  // showAlert function
  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  //capitalize function
  const capitalize = text => {
    if (!text) return '';
    return text
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  // form validation
  const validateForm = () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      showAlert('error', 'All fields are required.');
      return false;
    }
    if (password.length < 6) {
      showAlert('error', 'Password must be at least 6 characters.');
      return false;
    }
    if (password !== confirmPassword) {
      showAlert('error', 'Passwords do not match.');
      return false;
    }
    return true;
  };

  // handleSignUp function
  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim(),
      );

      const uid = userCredential.user.uid;
      const userDocRef = doc(firestore, 'users', uid);

      const formattedFirstName = capitalize(firstName);
      const formattedLastName = capitalize(lastName);

      console.log(formattedFirstName);
      console.log(formattedLastName);

      await setDoc(userDocRef, {
        firstName: formattedFirstName,
        lastName: formattedLastName,
        email: email.trim(),
        createdAt: serverTimestamp(),
      });
      console.log('Document successfully written!');

      showAlert(
        'success',
        `Başarıyla kayıt olundu: ${userCredential.user.email}`,
      );

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
    } catch (error) {
      console.log('Sign Up Error:', error);
      showAlert('error', error.message);
    } finally {
      setIsLoading(false);
      console.log('Sign Up finished');
    }
  };

  // handleAlertClose function
  const handleAlertClose = () => {
    setAlertVisible(false);
    if (alertType === 'success') {
      setTimeout(() => {
        // navigation.navigate('Home'); 
        navigation.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        });
      }, 300);
    }
  };

  return (
    <LinearGradient
      colors={['#f9c5d1', '#cdeff0', '#d3cce3']}
      style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Input
        label="First Name"
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize="words"
      />

      <Input
        label="Last Name"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="words"
      />

      <Input
        label="Email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        onBlur={() => setEmailTouched(true)}
        error={emailTouched && !email.trim() ? 'Email is required' : null}
      />

      <Input
        label="Password"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!passwordVisible}
        togglePasswordVisibility={() => setPasswordVisible(!passwordVisible)}
        passwordVisible={passwordVisible}
        error={
          password.length > 0 && password.length < 6
            ? 'Password must be at least 6 characters'
            : null
        }
      />

      <Input
        label="Confirm Password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!passwordVisible}
        error={
          confirmPassword && confirmPassword !== password
            ? 'Passwords do not match'
            : null
        }
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#c3aee9" />
      ) : (
        <Button title="Sign Up" onPress={handleSignUp} />
      )}

      <TouchableOpacity
        style={styles.signupLink}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signupLinkText}>
          Already have an account? <Text style={styles.signupText}>Log In</Text>
        </Text>
      </TouchableOpacity>

      <CustomAlert
        visible={alertVisible}
        type={alertType}
        message={alertMessage}
        onClose={handleAlertClose}
      />
    </LinearGradient>
  );
};

export default SignUp;
