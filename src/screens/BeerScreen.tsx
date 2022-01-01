import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ImageBackground, useWindowDimensions, Image, Dimensions } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParams } from '../navigator/Tab1';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { countries } from '../helpers/countries';

interface Props extends StackScreenProps<RootStackParams, 'BeerScreen'> { };

export const BeerScreen = ({ navigation, route }: Props) => {
  const { top } = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const { beer } = route.params;

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
        </View>

        {/* Beer Info */}
        <View style={{ marginHorizontal: 20 }}>

          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'JosefinBold', marginRight: 7 }}>
              País:
            </Text>
            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'JosefinRegular', marginTop: 3 }}>
              {countries.find((countrie) => countrie.value === beer.origin_country)?.flag}
              {` ${beer.origin_country}`}
            </Text>
          </View>

          <View>
            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'JosefinBold', marginRight: 7 }}>
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
    zIndex: 3
  },
});

