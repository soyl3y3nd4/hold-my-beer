import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, RefreshControl, Text, Platform, ImageBackground, useWindowDimensions, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BeerContext } from '../context/beerContext/BeerContext';

import { ListItemTopBeer } from '../components/ListItemTopBeer';
import { DrawerToggleButton } from '../components/DrawerToggleButton';
import SearchInput from '../components/SearchInput';
import { FadeInImage } from '../components/FadeInImage';

import { LoadingScreen } from './LoadingScreen';

import { waitFor } from '../helpers/helpers';
import { BeerCollection } from '../interfaces/Beers';

const screenWidth = Dimensions.get('window').width;
const DEFAULT_BEERS_LIMIT = 10;

interface Props {
  navigation: DrawerNavigationHelpers,
};

export const TopBeers = ({ ...props }: Props) => {
  const { navigation } = props;

  const { height, width } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const { beers, getBeers, isLoading } = useContext(BeerContext);

  const [term, setTerm] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filteredBeers, setFilteredBeers] = useState<BeerCollection[]>([]);
  const [currentBeers, setCurrentBeers] = useState<BeerCollection[]>([]);

  const [amountBeersLimit, setAmountBeersLimit] = useState(DEFAULT_BEERS_LIMIT);

  useEffect(() => {
    if (beers.length > 0) setCurrentBeers([...beers.slice(0, amountBeersLimit)]);
    else getBeers();
  }, []);

  useEffect(() => {
    if (isFocused) return;

    setTerm('');
    setTextValue('');
    setAmountBeersLimit(DEFAULT_BEERS_LIMIT);
    setFilteredBeers([]);

    setCurrentBeers([...beers.slice(0, DEFAULT_BEERS_LIMIT)]);
  }, [isFocused]);

  useEffect(() => {
    setIsRefreshing(true);

    if (!term.length) {
      setAmountBeersLimit(DEFAULT_BEERS_LIMIT);
      setFilteredBeers([]);
      setCurrentBeers([...beers.slice(0, DEFAULT_BEERS_LIMIT)]);
      setIsRefreshing(false);
      return;
    };

    filterBeersByText();
  }, [term]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await waitFor(300);

    await getBeers();
    setIsRefreshing(false);
  };

  const filterBeersByText = () => {
    const filtered = beers.filter((beer) => {
      const beerWithoutAccents = beer.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const termWithoutAccents = term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (beerWithoutAccents.includes(termWithoutAccents)) return beer;
    });

    if (filtered.length > 0) {
      setFilteredBeers(filtered);
    } else {
      setFilteredBeers([]);
    }
    setIsRefreshing(false);
  };

  const navigateToAddBeer = () => {
    navigation.navigate('NewBeer');
  };

  return (
    <>
      <ImageBackground style={{ height, width, alignItems: 'center', flex: 1 }} source={require('../images/bar.jpg')} resizeMode="cover">

        {
          term && !filteredBeers.length
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
            : term && filteredBeers.length > 0
              ? (
                <FlatList
                  style={{
                    paddingHorizontal: 15,
                    backgroundColor: 'rgba(0, 0, 0, 0.55)',
                    width: '100%',
                  }}
                  contentContainerStyle={{
                    alignItems: Dimensions.get('screen').width > 500 ? 'flex-start' : 'center',
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={isRefreshing}
                      onRefresh={onRefresh}
                      progressViewOffset={10}
                      progressBackgroundColor={'rgb(219, 192, 118)'}
                      colors={['white', 'rgb(219, 192, 118)']}
                    />
                  }
                  data={filteredBeers}
                  keyExtractor={(beer: any) => beer.name!}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={(
                    <View style={{ flexDirection: 'row', paddingVertical: 44 }} />
                  )}
                  ListFooterComponent={(<View style={{ height: 80 }} />)}
                  renderItem={({ item, index }) => {
                    return <ListItemTopBeer item={item} index={index} top />
                  }}
                />
              )
              : (
                <FlatList
                  style={{
                    paddingHorizontal: 15,
                    backgroundColor: 'rgba(0, 0, 0, 0.55)',
                    width: '100%',
                  }}
                  contentContainerStyle={{
                    alignItems: Dimensions.get('screen').width > 500 ? 'flex-start' : 'center',
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={isRefreshing}
                      onRefresh={onRefresh}
                      progressViewOffset={10}
                      progressBackgroundColor={'rgb(219, 192, 118)'}
                      colors={['white', 'rgb(219, 192, 118)']}
                    />
                  }
                  data={currentBeers}
                  keyExtractor={(beer: any) => beer.name!}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={(
                    <View style={{ flexDirection: 'row', paddingVertical: 44 }} />
                  )}
                  ListFooterComponent={(<View style={{ height: 80 }} />)}
                  renderItem={({ item, index }) => {
                    return <ListItemTopBeer item={item} index={index} top />
                  }}
                  onEndReached={() => {
                    if (term.length > 0) return;

                    setCurrentBeers([...beers.slice(0, amountBeersLimit + DEFAULT_BEERS_LIMIT)]);
                    setAmountBeersLimit((curentLimit) => curentLimit + DEFAULT_BEERS_LIMIT);
                  }}
                  onEndReachedThreshold={600}
                />
              )
        }

        {
          isLoading
            ? <LoadingScreen />
            : <>
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
        }
      </ImageBackground>
    </>
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