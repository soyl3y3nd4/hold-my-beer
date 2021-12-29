import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BeerCollection } from '../interfaces/Beers';
import { FadeInImage } from './FadeInImage';

interface Props {
  item: BeerCollection;
  index: number;
  top: boolean;
};

export const ListItemTopBeer = ({ item, index, top = true }: Props) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.listItemContainer}>
      {index === 0 && top && (
        <Image
          source={require('../images/gold.png')}
          style={styles.medalImage}
        />
      )}
      {index === 1 && top && (
        <Image
          source={require('../images/silver.png')}
          style={styles.medalImage}
        />
      )}
      {index === 2 && top && (
        <Image
          source={require('../images/bronze.png')}
          style={styles.medalImage}
        />
      )}

      <ImageBackground
        style={styles.imageHeaderBackground}
        imageStyle={styles.imageHeader}
        source={require('../images/header.jpg')}
        resizeMode="cover"
      >
        <Text
          style={{ ...styles.textHeader, marginLeft: top ? 20 : 25, letterSpacing: 1.1 }}>
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

        <View style={{ width: '60%', paddingLeft: 20 }}>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>Total votos: </Text>
            <Text style={styles.infoText}>{item.votes}</Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>Graduación: </Text>
            <Text style={styles.infoText}>{item.abv}%</Text>
          </View>

          <View style={styles.ingredientWrapper}>
            <Text style={styles.infoTextBold}>Ingredientes: </Text>
            {item.ingredients.map((ingredient, i) => (
              <Text key={ingredient + i} style={styles.textIngredient}>
                {ingredient}{i === item.ingredients.length - 1 ? '' : ','}
              </Text>
            ))}
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTextBold}>Origen: </Text>
            <Text style={styles.infoText}>{item.origin_country}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{ alignSelf: 'center', width: '10%' }}
          onPress={() => navigation.navigate('BeerScreen', {
            beer: item
          })}
        >
          <Icon name="chevron-forward" size={30} color="rgb(145, 121, 33)" />
        </TouchableOpacity>

      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: 'rgba(255,255,255,1)',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 25,
    borderRadius: 8,
    elevation: 5,
    shadowColor: 'rgb(85, 64, 0)',
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
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  beerImageContainer: {
    width: '28%',
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
