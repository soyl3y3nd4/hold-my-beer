import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './src/navigator/StackNavigator';
import { AuthProvider } from './src/context/authContext/AuthContext';
import { AlertProvider } from './src/context/alertContext/AlertContext';
import { BeerProvider } from './src/context/beerContext/BeerContext';
import { KeyboardProvider } from './src/context/keyboardContext/KeyboardContext';
import { waitFor } from './src/helpers/helpers';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    waitFor(1000).then(() => setIsLoaded(true));
  }, []);

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
        <BeerProvider>
          <KeyboardProvider>
            <NavigationContainer>
              {children}
            </NavigationContainer>
          </KeyboardProvider>
        </BeerProvider>
      </AuthProvider>
    </AlertProvider>
  </ApplicationProvider>
);

export default App;
