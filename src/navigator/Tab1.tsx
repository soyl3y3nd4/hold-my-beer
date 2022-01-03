import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { TopBeers } from '../screens/TopBeers';
import { BeerCollection } from '../interfaces/Beers';
import { BeerScreen } from '../screens/BeerScreen';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';


export type RootStackParams = {
  TopBeers: undefined,
  BeerScreen: { beer: BeerCollection },
};

interface Props {
  navigation: DrawerNavigationHelpers,
};

const Stack = createStackNavigator<RootStackParams>();

const Tab1 = ({ navigation }: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
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