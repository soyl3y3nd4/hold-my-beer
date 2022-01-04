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
  beer: BeerCollection;
  url: string;
};

const ListItemVotes = ({ beer, url }: Props) => {
  const [rateAverage, setRateAverage] = useState(0);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const average = getBeerAverage(beer);
    setRateAverage(average!);
  }, [beer]);

  return (
    <View
      // activeOpacity={0.9}
      // onPress={() => navigation.navigate('Tab1', { screen: 'BeerScreen', params: { beer, url } })}
      style={{
        ...styles.listItemContainer,
        width: screenWidth * 0.44,
      }}>
      <View style={styles.cardContent}>

        <View style={styles.beerImageContainer}>
          {
            beer.image_url.length > 0
              ? (
                <FadeInImage
                  uri={beer.image_url}
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

        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTextBold}>{beer.name}</Text>
        </View>

        <View style={styles.infoTextContainer}>
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

      </View>
    </View >
  );
};

export default ListItemVotes;

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: 'rgba(255,255,255,1)',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 25,
    borderRadius: 8,
    elevation: 5,
    shadowColor: 'rgb(85, 64, 0)',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.01)',
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  beerImageContainer: {
    width: '100%',
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
    fontSize: 14,
    fontFamily: 'JosefinBold'
  },
});
