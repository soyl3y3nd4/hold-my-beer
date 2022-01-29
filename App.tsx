import 'react-native-gesture-handler';

import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './src/navigator/StackNavigator';
import { AuthProvider } from './src/context/authContext/AuthContext';
import { AlertProvider } from './src/context/alertContext/AlertContext';
import { BeerProvider } from './src/context/beerContext/BeerContext';
import { UserProvider } from './src/context/userContext/UserContext';
import { KeyboardProvider } from './src/context/keyboardContext/KeyboardContext';

const App = () => {
  return (
    <AppState>
      <StackNavigator />
    </AppState>
  );
};

const AppState = ({ children }: any) => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <AlertProvider>
      <AuthProvider>
        <UserProvider>
          <BeerProvider>
            <KeyboardProvider>
              <NavigationContainer>
                {children}
              </NavigationContainer>
            </KeyboardProvider>
          </BeerProvider>
        </UserProvider>
      </AuthProvider>
    </AlertProvider>
  </ApplicationProvider>
);

export default App;
