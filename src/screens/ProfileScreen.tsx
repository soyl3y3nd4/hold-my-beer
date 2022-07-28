import React, { useContext, useEffect, useState } from 'react'
import { Text, View, ScrollView, ImageBackground, Dimensions, Image, StyleProp, ViewStyle } from 'react-native'

import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { BeerContext } from '../context/beerContext/BeerContext';
import { AuthContext } from '../context/authContext/AuthContext';
import { StyleSheet } from 'react-native';
import { UserContext } from '../context/userContext/UserContext';

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

export const ProfileScreen = ({ navigation }: Props) => {
  const {
    favouriteBeers,
    userNewBeers,
    userRatedBeers,
    getUserNewBeers,
    getUserRatedBeers,
    getFavouriteBeers,
  } = useContext(BeerContext);
  const { user } = useContext(AuthContext);
  const { avatar, birth_date, name, surname, getUserDetails } = useContext(UserContext);

  useEffect(() => {
    if (favouriteBeers.length === 0) getFavouriteBeers();
    if (userNewBeers.length === 0) getUserNewBeers();
    if (userRatedBeers.length === 0) getUserRatedBeers();

    if (!name || !surname || !birth_date || !avatar) {
      getUserDetails();
    };
  }, []);

  return (
    <>
      <ImageBackground
        style={viewStyles}
        source={require('../images/profile.jpg')}
        resizeMode="cover"
      />
      <DrawerToggleButton navigation={navigation} />

      <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}>
        <View style={styles.mainContainer}>
          <Text style={styles.textTitle}>Mi Usuario</Text>

          <View style={{ flexDirection: 'row', height: 50 }}>
            <Text style={styles.titleBold}>Avatar: </Text>
            <View style={styles.avatarContainer} >
              <Image
                source={
                  avatar
                    ? { uri: avatar }
                    : require('../images/avatars/default_avatar.jpg')
                } style={styles.avatarStyle}
              />
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.titleBold}>Usuario/email: </Text>
            <Text style={styles.info}>{user?.email}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.titleBold}>Cervezas en favoritos: </Text>
            <Text style={styles.info}>{favouriteBeers.length}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.titleBold}>Cervezas valoradas: </Text>
            <Text style={styles.info}>{userRatedBeers.length}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.titleBold}>Cervezas añadidas por mí: </Text>
            <Text style={styles.info}>{userNewBeers.length}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.titleBold}>Nombre: </Text>
            <Text style={styles.info}>{name}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.titleBold}>Apellido: </Text>
            <Text style={styles.info}>{surname}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.titleBold}>Fecha Nacimiento: </Text>
            <Text style={styles.info}>{birth_date}</Text>
          </View>

        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    paddingHorizontal: 20,
  },
  textTitle: {
    fontFamily: 'JosefinBold',
    fontSize: 20,
    color: 'white',
    marginTop: 26,
    marginBottom: 30,
  },
  infoContainer: {
    marginBottom: 10,
  },
  titleBold: {
    fontFamily: 'JosefinBold',
    fontSize: 16,
    color: 'white',
    marginBottom: 3,
  },
  info: {
    fontFamily: 'JosefinRegular',
    fontSize: 16,
    color: 'rgba(255, 182, 0, 0.8)',
    marginLeft: 15,
  },
  avatarContainer: {
    position: 'absolute',
    left: 100,
    top: -5,
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.85)',
    elevation: 5,
  },
  avatarStyle: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
});