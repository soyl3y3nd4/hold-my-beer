import React, { useContext, useEffect } from 'react'
import { Text, View, ScrollView, ImageBackground, Dimensions } from 'react-native'

import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { BeerContext } from '../context/beerContext/BeerContext';
import { AuthContext } from '../context/authContext/AuthContext';
import { StyleSheet } from 'react-native';

interface Props {
  navigation: DrawerNavigationHelpers
};

export const Dashboard = ({ navigation }: Props) => {
  const {
    beers,
    favouriteBeers,
    userNewBeers,
    userRatedBeers,
    getBeers,
    getUserNewBeers,
    getUserRatedBeers,
    getFavouriteBeers,
  } = useContext(BeerContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getBeers();
    getUserNewBeers();
    getUserRatedBeers();
    getFavouriteBeers();
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
      <DrawerToggleButton navigation={navigation} />

      <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(221, 204, 157, 0.5)', width: '100%', paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'JosefinBold', fontSize: 25, color: 'white', marginTop: 26, marginBottom: 10, }}>Panel Principal</Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.titleBold}>Usuario: </Text>
            <Text style={styles.info}>{user?.email}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.titleBold}>Total cervezas en API: </Text>
            <Text style={styles.info}>{beers.length}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.titleBold}>Total cervezas en favoritos: </Text>
            <Text style={styles.info}>{favouriteBeers.length}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.titleBold}>Total cervezas valoradas: </Text>
            <Text style={styles.info}>{userRatedBeers.length}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.titleBold}>Total cervezas creadas: </Text>
            <Text style={styles.info}>{userNewBeers.length}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  titleBold: {
    fontFamily: 'JosefinBold',
    fontSize: 16,
    color: 'white'
  },
  info: {
    fontFamily: 'JosefinRegular',
    fontSize: 16,
    color: 'white'
  }
});