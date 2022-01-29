import React, { useContext, useEffect, useState } from 'react'
import { Text, View, ScrollView, ImageBackground, Dimensions, FlatList } from 'react-native'

import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { BeerContext } from '../context/beerContext/BeerContext';
import { StyleSheet } from 'react-native';
import { ListItemFavourites } from '../components/ListItemFavourites';
import { BeerCollection } from '../interfaces/Beers';
import { orderBeersByDate, orderBeersByVotes } from '../helpers/helpers';

interface Props {
  navigation: DrawerNavigationHelpers
};

export const Dashboard = ({ navigation }: Props) => {
  const [beerTopVoted, setBeerTopVoted] = useState({} as BeerCollection);
  const [newestBeer, setNewestBeer] = useState({} as BeerCollection);

  const {
    beers,
    getBeers,
    getUserNewBeers,
    getUserRatedBeers,
    getFavouriteBeers,
  } = useContext(BeerContext);

  useEffect(() => {
    getBeers();
    getUserNewBeers();
    getUserRatedBeers();
    getFavouriteBeers();
  }, []);

  useEffect(() => {
    if (beers?.length === 0) return;
    const topVotedBeers = orderBeersByVotes([...beers]);
    setBeerTopVoted(topVotedBeers[0]);

    const newestBeer = orderBeersByDate([...beers]);
    setNewestBeer(newestBeer[0]);
  }, [beers]);

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
        source={require('../images/sunset.jpg')}
        resizeMode="cover"
      />
      <DrawerToggleButton navigation={navigation} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={{ flex: 1, backgroundColor: 'rgba(220, 220, 220, 0.1)', paddingHorizontal: 0, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'JosefinBold', fontSize: 25, color: 'white', marginTop: 26, marginBottom: 10, textAlign: 'center' }}>Bienvenido</Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.titleBold}>Total cervezas en el sistema: </Text>
            <Text style={styles.info}>{beers?.length}</Text>
          </View>

          <View style={{ marginBottom: 15, width: '100%' }}>
            <Text style={styles.titleBold}>La cerveza con mejor valoración: </Text>
            {
              beers?.length > 0 && (
                <FlatList
                  style={{
                    paddingHorizontal: 20,
                    width: '100%',
                  }}
                  contentContainerStyle={{
                    marginLeft: Dimensions.get('window').width * 0.02,
                  }}
                  data={beers.slice(0, 1)}
                  horizontal
                  keyExtractor={(beer: any) => beer.name!}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) =>
                    <ListItemFavourites item={item} fullScreen />
                  }
                />
              )
            }
          </View>

          <View style={{ marginBottom: 15, width: '100%' }}>
            <Text style={styles.titleBold}>La cerveza más votada: </Text>
            {
              beerTopVoted?.name && (
                <FlatList
                  style={{
                    paddingHorizontal: 15,
                    width: '100%',
                  }}
                  contentContainerStyle={{
                    marginLeft: Dimensions.get('window').width * 0.02,
                  }}
                  data={[beerTopVoted]}
                  horizontal
                  keyExtractor={(beer: any) => beer.name!}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) =>
                    <ListItemFavourites item={item} fullScreen />
                  }
                />
              )
            }
          </View>

          <View style={{ marginBottom: 15, width: '100%' }}>
            <Text style={styles.titleBold}>Última cerveza agregada: </Text>
            {
              newestBeer?.name && (
                <FlatList
                  style={{
                    paddingHorizontal: 15,
                    width: '100%',
                  }}
                  contentContainerStyle={{
                    marginLeft: Dimensions.get('window').width * 0.02,
                  }}
                  data={[newestBeer]}
                  horizontal
                  keyExtractor={(beer: any) => beer.name!}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) =>
                    <ListItemFavourites item={item} fullScreen />
                  }
                />
              )
            }
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  titleBold: {
    fontFamily: 'JosefinBold',
    fontSize: 14,
    color: 'white',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  info: {
    fontFamily: 'JosefinRegular',
    fontSize: 16,
    color: 'rgba(255, 182, 0, 0.9)',
  }
});