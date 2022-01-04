import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground, Image, Dimensions } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StackScreenProps } from '@react-navigation/stack';

import { AirbnbRating } from 'react-native-ratings';
import Tooltip from 'react-native-walkthrough-tooltip';

import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParams } from '../navigator/Tab1';
import { countries } from '../helpers/countries';

import { AuthContext } from '../context/authContext/AuthContext';
import { BeerCollection, BeerRatings } from '../interfaces/Beers';
import { BeerContext } from '../context/beerContext/BeerContext';
import { getBeerAverage, waitFor } from '../helpers/helpers';

interface Props extends StackScreenProps<RootStackParams, 'BeerScreen'> { };

export const BeerScreen = ({ route, navigation }: Props) => {
  const { top } = useSafeAreaInsets();
  // const navigation = useNavigation<any>();
  const { beer, url } = route.params;

  const { user } = useContext(AuthContext);
  const { favouriteBeers, toggleFavouriteBeer, rateBeer } = useContext(BeerContext);

  const [isFavourite, setIsFavourite] = useState(false);
  const [rateAverage, setRateAverage] = useState(0);
  const [userCanVote, setUserCanVote] = useState(true);
  const [showTip, setTip] = useState(false);

  useEffect(() => {
    const average = getBeerAverage(beer);
    setRateAverage(average!);
    checkIfUserHasVoted();
  }, [beer]);

  useEffect(() => {
    const favouriteBeer = favouriteBeers.find((favouriteBeer: BeerCollection) => favouriteBeer.name === beer.name);
    setIsFavourite(!!favouriteBeer);
  }, [favouriteBeers]);

  const checkIfUserHasVoted = () => {
    if (beer.ratings.length === 0) return;

    const userVoted = beer.ratings.find(
      (rating: BeerRatings) => rating.userId === user?.email
    );
    if (!userVoted) return;

    setUserCanVote(false);
  };

  const handleToggleFavorite = async () => {
    toggleFavouriteBeer(user?.email || '', beer)
  };

  const ratingCompleted = async (rating: number) => {
    const updatedBeer = {
      ...beer,
      ratings: [...beer.ratings, { rate: rating, userId: user?.email || '' }],
    };

    rateBeer(updatedBeer);

    await waitFor(500);
    setTip(false);

    await waitFor(300);
    setUserCanVote(false);

    navigation.navigate('BeerScreen', {
      beer: updatedBeer,
      url,
    });
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
        onPress={() => {
          if (url?.length > 0) {
            navigation.reset({ routes: [{ name: 'TopBeers' }] });
            // @ts-ignore
            navigation.navigate('BottomTabsNavigator', { screen: url });
          } else {
            navigation.navigate('TopBeers');
          }
        }}
      >
        <Icon
          name="arrow-back-outline"
          color="white"
          size={35}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {/* Beer Image */}
        <View style={styles.imageMainCointainer}>
          <View style={{ width: 200, paddingVertical: 10 }}>
            <Image
              source={{ uri: beer.image_url }}
              style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
            />
          </View>

          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={{ position: 'absolute', top: 15, right: 15, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 50, padding: 5, }}
          >
            <Icon
              name={
                isFavourite
                  ? 'heart'
                  : 'heart-outline'
              }
              size={25}
              style={{ top: 1 }}
              color={
                isFavourite
                  ? 'rgba(206, 47, 47, 0.7)'
                  : 'white'
              }
            />
          </TouchableOpacity>
        </View>

        {/* Beer Name */}
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.beerName}>
            {beer.name}
          </Text>
        </View>

        {/* Beer Info */}
        <View style={{ marginHorizontal: 20 }}>

          {/* Rating */}
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Valoración:
            </Text>
            <AirbnbRating
              ratingContainerStyle={{ marginTop: -57 }}
              starContainerStyle={{ marginTop: 2, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 5 }}
              isDisabled={true}
              count={5}
              reviews={[]}
              defaultRating={rateAverage}
              size={15}
            />

            {
              userCanVote
                ? (
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    allowChildInteraction
                    isVisible={showTip}
                    content={
                      <AirbnbRating
                        ratingContainerStyle={{ marginTop: -57 }}
                        starContainerStyle={{ marginTop: 0, borderRadius: 5 }}
                        count={5}
                        reviews={[]}
                        onFinishRating={ratingCompleted}
                        defaultRating={0}
                        size={25}
                      />
                    }
                    onClose={() => setTip(false)}
                    placement="bottom"
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{ borderRadius: 50, padding: 5, }}
                      onPress={() => setTip(true)}
                    >
                      <Text style={{ color: 'rgb(109, 167, 255)', textDecorationLine: 'underline', top: -2, marginLeft: 2 }}>Valorar</Text>
                    </TouchableOpacity>
                  </Tooltip>
                )
                : <Text style={{ color: 'rgba(255, 255, 255, 0.6)', top: -2, marginLeft: 2, padding: 5 }}>Ya has votado!</Text>
            }

          </View>

          {/* Votes */}
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Total votos:
            </Text>
            <Text style={styles.infoText}>
              {beer.ratings.length}
            </Text>
          </View>


          {/* Name */}
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Nombre:
            </Text>
            <Text style={styles.infoText}>
              {beer.name}
            </Text>
          </View>

          {/* Country */}
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              País:
            </Text>
            <Text style={styles.infoText}>
              {`${beer.origin_country} `}
              {countries.find((countrie) => countrie.value === beer.origin_country)?.flag}
            </Text>
          </View>

          {/* City */}
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Ciudad:
            </Text>
            <Text style={styles.infoText}>
              {beer.city}
            </Text>
          </View>

          {/* First brewed */}
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Primera elaboración:
            </Text>
            <Text style={styles.infoText}>
              {beer.first_brewed}
            </Text>
          </View>

          {/* Type */}
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Tipo:
            </Text>
            <Text style={styles.infoText}>
              {beer.type}
            </Text>
          </View>

          {/* Speciality */}
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>
              Especialidad:
            </Text>
            <Text style={styles.infoText}>
              {beer.speciality}
            </Text>
          </View>

          {/* Ingredients */}
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

          {/* Description */}
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
    marginTop: 0,
    marginBottom: 10,
    textAlign: 'center'
  },
  imageMainCointainer: {
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 270,
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

