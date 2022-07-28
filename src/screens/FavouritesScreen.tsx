import React, { useContext } from 'react'
import { Text, View, ScrollView, ImageBackground, Dimensions, FlatList, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { BeerContext } from '../context/beerContext/BeerContext';
import { LoadingScreen } from './LoadingScreen';
import { ListItemFavourites } from '../components/ListItemFavourites';

const viewStyles: StyleProp<ViewStyle> = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: Dimensions.get("window").width, //for full screen
  height: Dimensions.get("window").height //for full screen
};

interface Props {
  navigation: DrawerNavigationHelpers
};

export const FavouritesScreen = ({ navigation }: Props) => {
  const {
    favouriteBeers,
    isLoading,
    userNewBeers,
    userRatedBeers,
  } = useContext(BeerContext);

  return (
    <>
      <ImageBackground
        style={viewStyles}
        source={require('../images/sunset.jpg')}
        resizeMode="cover"
      />

      <View style={{
        ...viewStyles,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      />
      <ScrollView>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Mis cervezas</Text>
        </View>

        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>Cervezas Favoritas</Text>
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
                <Text style={styles.noBeersText}>No tienes cervezas favoritas.</Text>
              </View>
            )
        }

        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>Cervezas votadas</Text>
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
                <Text style={styles.noBeersText}>No has valorado cervezas.</Text>
              </View>
            )
        }

        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>Cervezas Agregadas</Text>
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
                <Text style={styles.noBeersText}>No has agregado cervezas.</Text>
              </View>
            )
        }

      </ScrollView>

      {isLoading
        ? <LoadingScreen />
        : <DrawerToggleButton navigation={navigation} />
      }
    </>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontFamily: 'JosefinBold',
    fontSize: 20,
    color: 'white',
  },
  infoTextContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  noBeersText: {
    fontFamily:
      'JosefinRegular',
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
  },
  infoText: {
    fontFamily: 'JosefinBold',
    fontSize: 16,
    color: 'rgba(255,255,255, 1)',
  },
});