import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground, useWindowDimensions, Image, Dimensions } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParams } from '../navigator/Tab1';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { countries } from '../helpers/countries';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../context/authContext/AuthContext';
import { BeerCollection } from '../interfaces/Beers';
import { BeerContext } from '../context/beerContext/BeerContext';

interface Props extends StackScreenProps<RootStackParams, 'BeerScreen'> { };

export const BeerScreen = ({ navigation, route }: Props) => {
  const { top } = useSafeAreaInsets();
  const { beer } = route.params;

  const { user } = useContext(AuthContext);
  const { favouriteBeers, toggleFavouriteBeer } = useContext(BeerContext);

  const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    const favouriteBeer = favouriteBeers.find((favouriteBeer: BeerCollection) => favouriteBeer.name === beer.name);
    setIsFavourite(!!favouriteBeer);
  }, [favouriteBeers]);

  const handleToggleFavorite = async () => {
    toggleFavouriteBeer(user?.email || '', beer)
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
        source={require('../images/detail.jpg')}
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
        backgroundColor: 'rgba(0,0,0,0.2)',
      }} />

      {/* Go Back Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          ...styles.backButton,
          top: top + 12,
        }}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="arrow-back-outline"
          color="white"
          size={35}
        />
      </TouchableOpacity>

      {/* Beer Name */}
      <View style={{ justifyContent: 'center' }}>
        <Text style={styles.beerName}>
          {beer.name}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {/* Beer Image */}
        <View style={styles.imageMainCointainer}>
          <View style={{ width: 200 }}>
            <Image
              source={{ uri: beer.image_url }}
              style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
            />
          </View>

          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={{ position: 'absolute', top: 10, right: 10 }}
          >
            <Icon name={
              isFavourite
                ? 'heart'
                : 'heart-outline'
            } size={30} color="red" />
          </TouchableOpacity>
        </View>

        {/* Beer Info */}
        <View style={{ marginHorizontal: 20 }}>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Total votos:
            </Text>
            <Text style={styles.infoText}>
              {beer.votes}
            </Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Nombre:
            </Text>
            <Text style={styles.infoText}>
              {beer.name}
            </Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              País:
            </Text>
            <Text style={styles.infoText}>
              {`${beer.origin_country} `}
              {countries.find((countrie) => countrie.value === beer.origin_country)?.flag}
            </Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Ciudad:
            </Text>
            <Text style={styles.infoText}>
              {beer.city}
            </Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Primera elaboración:
            </Text>
            <Text style={styles.infoText}>
              {beer.first_brewed}
            </Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Tipo:
            </Text>
            <Text style={styles.infoText}>
              {beer.type}
            </Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Especialidad:
            </Text>
            <Text style={styles.infoText}>
              {beer.speciality}
            </Text>
          </View>

          <View>
            <Text style={styles.infoTextBold}>
              Ingredientes:
            </Text>

            {beer.ingredients.map((ingredient) =>
              <Text
                key={ingredient}
                style={{
                  ...styles.infoText,
                  marginLeft: 80,
                }}
              >
                - {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
              </Text>
            )}

          </View>

          <View style={{ marginBottom: 40 }}>
            <Text style={styles.infoTextBold}>
              Descripción:
            </Text>
            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'JosefinRegular', marginTop: 1 }}>
              {beer.description}
            </Text>
          </View>

        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  beerName: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'JosefinBold',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center'
  },
  imageMainCointainer: {
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    elevation: 7,
    shadowColor: 'white',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    zIndex: 3,
  },
  infoTextContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoTextBold: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'JosefinBold',
    marginRight: 7,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'JosefinRegular',
    marginTop: 2,
  }
});

