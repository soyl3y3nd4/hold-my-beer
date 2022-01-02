import React, { useContext, useEffect } from 'react'
import { Text, View, ScrollView, ImageBackground, Dimensions } from 'react-native'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { AuthContext } from '../context/authContext/AuthContext';
import { BeerCollection } from '../interfaces/Beers';
import { BeerContext } from '../context/beerContext/BeerContext';
import { LoadingScreen } from './LoadingScreen';

interface Props {
  navigation: DrawerNavigationHelpers
};

export const FavouritesScreen = ({ navigation }: Props) => {
  const { user } = useContext(AuthContext);
  const { getFavouriteBeers, favouriteBeers, isLoading } = useContext(BeerContext);

  useEffect(() => {
    getFavouriteBeers(user?.email || '');
  }, []);

  return (
    <>
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
        source={require('../images/sunset.jpg')}
        resizeMode="cover"
      />

      <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(221, 204, 157, 0.5)', width: '100%', alignItems: 'center', justifyContent: 'center' }}>

          {favouriteBeers.length > 0
            && favouriteBeers.map((favouriteBeer: BeerCollection) => (
              <Text key={favouriteBeer.name} style={{ fontSize: 25, color: '#000000' }}>
                {favouriteBeer.name}
              </Text>
            ))
          }
          {!isLoading && favouriteBeers.length === 0 &&
            <Text style={{ fontSize: 25, color: '#000000' }}>
              Empty Favourites
            </Text>
          }
        </View>
      </ScrollView>
      {isLoading
        ? <LoadingScreen />
        : <DrawerToggleButton navigation={navigation} />
      }
    </>
  );
};