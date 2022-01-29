import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Ionicons';
import { countries } from '../helpers/countries';
import { getBeerAverage } from '../helpers/helpers';
import { BeerCollection } from '../interfaces/Beers';
import { FadeInImage } from './FadeInImage';

const screenWidth = Dimensions.get('window').width;

interface Props {
  item: BeerCollection;
  fullScreen: boolean;
};

export const ListItemFavourites = ({ item, fullScreen }: Props) => {
  const navigation = useNavigation<any>();
  const [rateAverage, setRateAverage] = useState(0);

  useEffect(() => {
    const average = getBeerAverage(item);
    setRateAverage(average!);
  }, [item]);

  console.log(Dimensions.get('window').width)
  return (
    <TouchableOpacity
      activeOpacity={0.98}
      style={[
        styles.listItemContainer,
        fullScreen ? styles.fullScreen : {}
      ]}
      onPress={() => navigation.navigate('BeerScreen', {
        beer: item
      })}
    >

      <ImageBackground
        style={styles.imageHeaderBackground}
        imageStyle={styles.imageHeader}
        source={require('../images/header.jpg')}
        resizeMode="cover"
      >
        <Text
          style={{ ...styles.textHeader, marginLeft: 25, letterSpacing: 1.1 }}>
          {item.name}
        </Text>
      </ImageBackground>

      <View style={styles.cardContent}>

        <View style={styles.beerImageContainer}>
          {
            item.image_url.length > 0
              ? (
                <FadeInImage
                  uri={item.image_url}
                  style={styles.beerImage}
                />
              )
              : (
                <FadeInImage
                  image={require('../images/default_beer.png')}
                  style={styles.beerImage}
                />
              )
          }

        </View>

        <View style={{ flex: 4, paddingLeft: 20 }}>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>País: </Text>
            <Text style={styles.infoText}>
              {`${item.origin_country} `}
              {countries.find((countrie) => countrie.value === item.origin_country)?.flag}
            </Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>Ciudad: </Text>
            <Text style={styles.infoText}>{item.city}</Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>Graduación: </Text>
            <Text style={styles.infoText}>{item.abv}%</Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>Tipo: </Text>
            <Text style={styles.infoText}>{item.type}</Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>Espec: </Text>
            <Text style={styles.infoText}>{item.speciality}</Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>Valoración: </Text>
            <AirbnbRating
              ratingContainerStyle={{ marginTop: -53 }}
              starContainerStyle={{ marginTop: 2, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 5 }}
              isDisabled={true}
              count={5}
              reviews={[]}
              defaultRating={rateAverage}
              size={12}
            />
          </View>

          <TouchableOpacity
            style={{ alignSelf: 'center', width: 40, position: 'absolute', right: -5, top: 35 }}
            onPress={() => navigation.navigate('BeerScreen', {
              beer: item
            })}
          >
            <Icon name="chevron-forward" size={30} color="rgb(145, 121, 33)" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: 'rgba(255,255,255,1)',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 5,
    shadowColor: 'rgb(85, 64, 0)',
    height: 160,
    marginRight: 25,
  },
  fullScreen: {
    width: screenWidth > 500 ? screenWidth * 0.56 : screenWidth * 0.85,
  },
  medalImage: {
    height: 45,
    width: 30,
    position: 'absolute',
    right: 20,
    top: 5,
    zIndex: 3,
  },
  imageHeaderBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    width: '100%',
  },
  imageHeader: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  textHeader: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 17,
    fontFamily: 'JosefinRegular',
  },
  cardContent: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  beerImageContainer: {
    flex: 2,
    width: '30%',
    height: 110,
    justifyContent: 'center',
    alignItems: 'center'
  },
  beerImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  infoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoTextBold: {
    color: '#024750',
    fontSize: 13,
    fontFamily: 'JosefinBold'
  },
  infoText: {
    color: '#024750',
    fontSize: 12,
    fontFamily: 'JosefinRegular'
  },
  ingredientWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  textIngredient: {
    color: '#024750',
    fontSize: 12,
    marginLeft: 1,
    fontFamily: 'JosefinRegular'
  }
});
