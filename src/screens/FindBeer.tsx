import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, FlatList, ImageBackground, useWindowDimensions } from 'react-native';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { useBeer } from '../hooks/useBeer';
import { DrawerToggleButton } from '../components/DrawerToggleButton';
import SearchInput from '../components/SearchInput';
import { ListItemTopBeer } from '../components/ListItemTopBeer';
import { FadeInImage } from '../components/FadeInImage';

import { BeerCollection } from '../interfaces/Beers';

const screenWidth = Dimensions.get('window').width;

interface Props {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
  setFocusedTab: (number: number) => void;
};

export const FindBeer = ({ setFocusedTab, ...props }: Props) => {
  const { height, width } = useWindowDimensions();

  const { navigation } = props;
  const { top } = useSafeAreaInsets();
  const { beers } = useBeer();

  const [term, setTerm] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');

  const [filteredBeers, setFilteredBeers] = useState<BeerCollection[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) return;

    setTerm('');
    setTextValue('');
  }, [isFocused]);

  useEffect(() => {
    if (term.length === 0) {
      return setFilteredBeers([]);
    };
    const filtered = beers.filter((beer) => beer.name.toLowerCase().includes(term.toLowerCase()));
    if (filtered.length > 0) {
      setFilteredBeers(filtered);
    } else {
      setFilteredBeers([]);
    }
  }, [term]);

  const navigateToAddBeer = () => {
    setFocusedTab(3);
    navigation.navigate('NewBeer');
  };

  return (
    <ImageBackground style={{ height, width, alignItems: 'center', flex: 1, }} source={require('../images/bar.jpg')} resizeMode="cover">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(221, 204, 157, 0.5)', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, }}>
        <DrawerToggleButton {...props} />

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
    width: screenWidth - 100,
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
