import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { BeersListScreen } from '../screens/BeersListScreen';
import { BeerCollection } from '../interfaces/Beers';
import { BeerScreen } from '../screens/BeerScreen';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { FavouritesScreen } from '../screens/FavouritesScreen';
import { EditBeerScreen } from '../screens/EditBeerScreen';
const TransitionScreenOptions = {
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  // ...TransitionPresets.ModalFadeTransition, // This is where the transition happens
};

export type RootStackParams = {
  FavouritesScreen: undefined,
  BeerScreen: { beer: BeerCollection, url: string },
  EditBeerScreen: { beer: BeerCollection },
};

interface Props {
  navigation: DrawerNavigationHelpers,
};

const Stack = createStackNavigator<RootStackParams>();

const Tab3 = ({ navigation }: Props) => {
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
      <Stack.Screen name="FavouritesScreen" children={() => <FavouritesScreen navigation={navigation} />} />
      <Stack.Screen name="BeerScreen" component={BeerScreen} />
      <Stack.Screen name="EditBeerScreen" component={EditBeerScreen} />
    </Stack.Navigator>
  );
};
export default Tab3;