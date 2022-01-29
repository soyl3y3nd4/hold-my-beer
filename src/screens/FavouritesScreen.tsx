import React, { useContext, useEffect } from 'react'
import { Text, View, ScrollView, ImageBackground, Dimensions, FlatList } from 'react-native'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { AuthContext } from '../context/authContext/AuthContext';
import { BeerContext } from '../context/beerContext/BeerContext';
import { LoadingScreen } from './LoadingScreen';
import { ListItemFavourites } from '../components/ListItemFavourites';
import { useIsFocused } from '@react-navigation/native';

interface Props {
  navigation: DrawerNavigationHelpers
};

export const FavouritesScreen = ({ navigation }: Props) => {
  const {
    getFavouriteBeers,
    favouriteBeers,
    isLoading,
    getUserNewBeers,
    getUserRatedBeers,
    userNewBeers,
    userRatedBeers,
  } = useContext(BeerContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;

    getFavouriteBeers();
    getCreatedBeers();
    getVotedBeers();
  }, [isFocused]);

  const getCreatedBeers = async () => {
    getUserNewBeers();
  };

  const getVotedBeers = async () => {
    getUserRatedBeers();
  };

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

      <View style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: Dimensions.get("window").width, //for full screen
        height: Dimensions.get("window").height, //for full screen
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      />
      <ScrollView>
        <>
          <View style={{ flexDirection: 'row', paddingVertical: 15, paddingTop: 30, paddingHorizontal: 20 }}>
            <Text style={{ fontFamily: 'JosefinBold', fontSize: 18, color: 'rgba(255,255,255, 1)', }}>Mis Favoritas</Text>
          </View>

          {
            favouriteBeers.length > 0
              ? (
                <FlatList
                  style={{
                    paddingHorizontal: 15,
                    width: '100%',
                  }}
                  data={favouriteBeers}
                  horizontal
                  keyExtractor={(beer: any) => beer.name!}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) =>
                    <ListItemFavourites item={item} fullScreen />
                  }
                />
              )
              : (
                <View style={{ paddingHorizontal: 20 }}>
                  <Text style={{ fontFamily: 'JosefinRegular', fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>No tienes cervezas favoritas.</Text>
                </View>
              )
          }
        </>

        <>
          <View style={{ flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 20 }}>
            <Text style={{ fontFamily: 'JosefinBold', fontSize: 18, color: 'rgba(255,255,255, 1)', }}>Valoradas por mí</Text>
          </View>

          {
            userRatedBeers.length > 0
              ? (
                <FlatList
                  style={{
                    paddingHorizontal: 15,
                    width: '100%',
                  }}
                  data={userRatedBeers}
                  horizontal
                  keyExtractor={(beer: any) => beer.name!}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) =>
                    <ListItemFavourites item={item} fullScreen />
                  }
                />
              )
              : (
                <View style={{ paddingHorizontal: 20 }}>
                  <Text style={{ fontFamily: 'JosefinRegular', fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>No has valorado cervezas.</Text>
                </View>
              )
          }
        </>


        <>
          <View style={{ flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 20 }}>
            <Text style={{ fontFamily: 'JosefinBold', fontSize: 18, color: 'rgba(255,255,255, 1)', }}>Agregadas por mí</Text>
          </View>

          {
            userNewBeers.length > 0
              ? (
                <FlatList
                  style={{
                    paddingHorizontal: 15,
                    width: '100%',
                  }}
                  data={userNewBeers}
                  horizontal
                  keyExtractor={(beer: any) => beer.name!}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) =>
                    <ListItemFavourites item={item} fullScreen />
                  }
                />
              )
              : (
                <View style={{ paddingHorizontal: 20 }}>
                  <Text style={{ fontFamily: 'JosefinRegular', fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>No has agregado cervezas.</Text>
                </View>
              )
          }
        </>
      </ScrollView>


      {isLoading
        ? <LoadingScreen />
        : <DrawerToggleButton navigation={navigation} />
      }
    </>
  );
};