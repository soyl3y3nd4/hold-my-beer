import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { TopBeers } from '../screens/TopBeers';
import { BeerCollection } from '../interfaces/Beers';
import { BeerScreen } from '../screens/BeerScreen';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { FindBeer } from '../screens/FindBeer';
const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  // ...TransitionPresets.ModalFadeTransition, // This is where the transition happens
};

export type RootStackParams = {
  FindBeer: undefined,
  BeerScreen: { beer: BeerCollection },
};

interface Props {
  navigation: DrawerNavigationHelpers,
}
const Stack = createStackNavigator<RootStackParams>();

const Tab2 = ({ navigation }: Props) => {
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
      <Stack.Screen name="FindBeer" children={() => <FindBeer navigation={navigation} />} />
      <Stack.Screen name="BeerScreen" component={BeerScreen} />
    </Stack.Navigator>
  );
};
export default Tab2;

