import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from '@react-native-firebase/firestore';
import styles from './Welcome.style';
import Button from '../../components/Button';

import avatar1 from '../../../assets/avatar1.png';
import avatar2 from '../../../assets/avatar2.png';
import avatar3 from '../../../assets/avatar3.png';

const avatarOptions = {
  avatar1,
  avatar2,
  avatar3,
};

const Welcome = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('avatar1');

  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const userRef = doc(firestore, 'users', user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setFirstName(userData.firstName || 'User');
            setSelectedAvatar(userData.avatar || 'avatar1');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleToQuestion = async () => {
    if (user) {
      const userRef = doc(firestore, 'users', user.uid);
      await updateDoc(userRef, { avatar: selectedAvatar });
    }
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {firstName}!</Text>
      <Text style={styles.subText}>Choose your avatar:</Text>

      <View style={styles.avatarContainer}>
        {Object.entries(avatarOptions).map(([key, image]) => (
          <TouchableOpacity key={key} onPress={() => setSelectedAvatar(key)}>
            <Image
              source={image}
              style={[
                styles.avatar,
                selectedAvatar === key && styles.selectedAvatar,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subText}>Ready to check your acne condition?</Text>

      <Button
        title="Start"
        onPress={handleToQuestion}
        style={styles.button}
      />
    </View>
  );
};

export default Welcome;
