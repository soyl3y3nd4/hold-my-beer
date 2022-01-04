import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { TopBeers } from '../screens/TopBeers';
import { BeerCollection } from '../interfaces/Beers';
import { BeerScreen } from '../screens/BeerScreen';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  // ...TransitionPresets.ModalFadeTransition, // This is where the transition happens
};

export type RootStackParams = {
  TopBeers: undefined,
  BeerScreen: { beer: BeerCollection, url: string },
};

interface Props {
  navigation: DrawerNavigationHelpers,
};

const Stack = createStackNavigator<RootStackParams>();

const Tab1 = ({ navigation }: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionScreenOptions,
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        }
      }}
    >
      <Stack.Screen name="TopBeers" children={() => <TopBeers navigation={navigation} />} />
      <Stack.Screen name="BeerScreen" component={BeerScreen} />
    </Stack.Navigator>
  );
};
export default Tab1;