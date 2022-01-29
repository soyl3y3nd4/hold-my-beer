import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, FlatList, ImageBackground, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { BeerContext } from '../context/beerContext/BeerContext';

import { DrawerToggleButton } from '../components/DrawerToggleButton';
import SearchInput from '../components/SearchInput';
import { ListItemTopBeer } from '../components/ListItemTopBeer';
import { FadeInImage } from '../components/FadeInImage';

import { BeerCollection } from '../interfaces/Beers';
import { LoadingScreen } from './LoadingScreen';

const screenWidth = Dimensions.get('window').width;

interface Props {
  navigation: DrawerNavigationHelpers;
};

export const FindBeer = ({ ...props }: Props) => {
  const { height, width } = useWindowDimensions();

  const { navigation } = props;
  const { top } = useSafeAreaInsets();
  const { beers, getBeers, isLoading } = useContext(BeerContext);

  const [term, setTerm] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');

  const [filteredBeers, setFilteredBeers] = useState<BeerCollection[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (beers.length > 0) return;
    getBeers();
  }, []);

  useEffect(() => {
    if (isFocused) return;

    setTerm('');
    setTextValue('');
  }, [isFocused]);

  useEffect(() => {
    if (term.length === 0) {
      return setFilteredBeers([]);
    };
    const filtered = beers.filter((beer) => {
      const beerWithoutAccents = beer.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const termWithoutAccents = term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      if (beerWithoutAccents.includes(termWithoutAccents)) {
        return beer;
      }
    });
    if (filtered.length > 0) {
      setFilteredBeers(filtered);
    } else {
      setFilteredBeers([]);
    }
  }, [term]);

  const navigateToAddBeer = () => {
    navigation.navigate('NewBeer');
  };

  return (
    <ImageBackground style={{ height, width, alignItems: 'center', flex: 1, }} source={require('../images/bar.jpg')} resizeMode="cover">
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(221, 204, 157, 0.2)', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, }}>
        <View style={{ flex: 1 }}>
          {
            term.length > 0 && filteredBeers.length === 0
              ? (
                <View style={styles.wrapperNotFound}>
                  <FadeInImage
                    style={styles.imageNotFound}
                    image={require('../images/not_found.png')}
                  />
                  <Text style={styles.notFoundBeerText}>
                    No hemos encontrado tu birra
                  </Text>
                  <TouchableOpacity onPress={navigateToAddBeer}>
                    <Text style={styles.addBeerText}>
                      Agrégala!
                    </Text>
                  </TouchableOpacity>
                </View>
              )
              : (
                <FlatList
                  style={{
                    paddingHorizontal: 15,
                  }}
                  data={filteredBeers}
                  keyExtractor={(beer: any) => beer.name!}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: Dimensions.get('screen').width > 500 ? 'flex-start' : 'center',
                  }}
                  ListHeaderComponent={(
                    <View style={{
                      marginTop: Platform.OS === 'ios'
                        ? top + 60
                        : top + 80,
                    }} />
                  )}
                  renderItem={({ item, index }) => {
                    return <ListItemTopBeer item={item} index={index} top={false} />
                  }}
                />
              )
          }
        </View>
      </View >
      {
        isLoading
          ? <LoadingScreen />
          : (
            <>
              <DrawerToggleButton {...props} tablet />
              <SearchInput
                textValue={textValue}
                setTextValue={setTextValue}
                onDebounce={(value) => setTerm(value)}
                style={{
                  ...styles.searchInput,
                  top: Platform.OS === 'ios'
                    ? top
                    : top + 25,
                }}
              />
            </>
          )
      }
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  findBeerContainer: {
    flex: 1,
    backgroundColor: 'rgba(221, 204, 157, 0.3)',
  },
  searchInput: {
    position: 'absolute',
    zIndex: 999,
    width: screenWidth > 500 ? screenWidth * 0.48 : screenWidth * 0.7,
    left: 0,
  },
  wrapperNotFound: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 170,
    height: 180,
  },
  imageNotFound: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  notFoundBeerText: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 20,
    marginTop: 20,
    fontFamily: 'JosefinRegular',
  },
  addBeerText: {
    color: 'white',
    fontSize: 24,
    marginTop: 20,
    fontFamily: 'JosefinRegular',
  },
});
