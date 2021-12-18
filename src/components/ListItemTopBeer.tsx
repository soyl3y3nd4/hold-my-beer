import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BeerCollection } from '../interfaces/Beers';
import { FadeInImage } from './FadeInImage';

interface Props {
  item: BeerCollection;
  index: number;
  top: boolean;
};

export const ListItemTopBeer = ({ item, index, top = true }: Props) => {
  return (
    <View style={{
      backgroundColor: 'rgba(255,255,255,1)',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 25,
      borderRadius: 8,
      elevation: 5,
      shadowColor: 'rgb(85, 64, 0)',
    }}>
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
        {/* {top && (
          <Text
            style={{ ...styles.textHeader, marginLeft: 15 }}>
            {index + 1} -
          </Text>
        )} */}
        <Text
          style={{ ...styles.textHeader, marginLeft: top ? 20 : 25, letterSpacing: 1.1 }}>
          {item.name}
        </Text>
      </ImageBackground>

      <View style={styles.cardContent}>

        <View style={{ width: '28%', height: 110, justifyContent: 'center', alignItems: 'center' }}>
          <FadeInImage
            uri={item.image_url}
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: '100%',
            }}
          />
        </View>

        <View style={{ width: '60%', paddingLeft: 20 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#024750', fontSize: 13, fontFamily: 'JosefinBold' }}>Total votos: </Text>
            <Text style={{ color: '#024750', fontSize: 12, fontFamily: 'JosefinRegular' }}>{item.votes}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#024750', fontSize: 13, fontFamily: 'JosefinBold' }}>Graduación: </Text>
            <Text style={{ color: '#024750', fontSize: 12, fontFamily: 'JosefinRegular' }}>{item.abv}%</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
            <Text style={{ color: '#024750', fontSize: 13, fontFamily: 'JosefinBold' }}>Ingredientes: </Text>
            {item.ingredients.map((ingredient, i) => (
              <Text key={ingredient + i} style={{ color: '#024750', fontSize: 12, marginLeft: 1, fontFamily: 'JosefinRegular' }}>
                {ingredient}{i === item.ingredients.length - 1 ? '' : ','}
              </Text>
            ))}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#024750', fontSize: 13, fontFamily: 'JosefinBold' }}>Origen: </Text>
            <Text style={{ color: '#024750', fontSize: 12, fontFamily: 'JosefinRegular' }}>{item.origin_country}</Text>
          </View>
        </View>

        <View style={{ alignSelf: 'center', width: '10%' }}>
          <Icon name="chevron-forward" size={30} color="rgb(145, 121, 33)" />
        </View>

      </View>
    </View >
  );
};

const styles = StyleSheet.create({
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
  }
});
