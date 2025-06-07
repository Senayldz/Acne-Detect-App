import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';

// Sayfalar
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import First from './pages/First';
import SignUp from './pages/SignUp';
import Questions from './pages/Questions';
import Home from './pages/Home';
import ChatScreen from './pages/ChatScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const app = getApp();
    const auth = getAuth(app);

    // Kullanıcı durumunu dinle
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []); // sadece mount anında

  if (initializing) {
    // Yükleniyor ekranı
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Questions" component={Questions} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="First" component={First} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
