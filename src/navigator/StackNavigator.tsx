import React, { useContext, useEffect } from 'react';

import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';

import DrawerNavigator from './DrawerNavigator';
import { AuthContext } from '../context/authContext/AuthContext';
import { RegisterScreen } from '../screens/RegisterScreen';
import auth from '@react-native-firebase/auth';
import { ImageBackground, useWindowDimensions } from 'react-native';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { user, authenticate } = useContext(AuthContext);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState => {
      if (userState?.emailVerified) {
        return authenticate(userState);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'black',
        },
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        cardOverlay: () => (
          <ImageBackground
            style={{ flex: 1, height, width, alignItems: 'center' }}
            source={require('../images/piledbeers1.jpg')}
            resizeMode="cover"
          />
        ),
      }}
    >
      {user
        ? <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )
      }
    </Stack.Navigator>
  );
};

export default StackNavigator;