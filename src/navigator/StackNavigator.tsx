import React, { useContext, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';

import DrawerNavigator from './DrawerNavigator';
import { AuthContext } from '../context/authContext/AuthContext';
import { RegisterScreen } from '../screens/RegisterScreen';
import auth from '@react-native-firebase/auth';
import { Dimensions, ImageBackground } from 'react-native';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { user, authenticate } = useContext(AuthContext);

  useEffect(() => {
    SplashScreen.hide();

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
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
        cardOverlay: () => (
          <ImageBackground
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: Dimensions.get("window").width, //for full screen
              height: Dimensions.get("window").height //for full screen
            }}
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