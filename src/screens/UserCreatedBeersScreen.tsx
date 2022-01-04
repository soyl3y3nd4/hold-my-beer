import React, { useContext, useEffect, useState } from 'react'
import { Text, View, ImageBackground, Dimensions, FlatList, RefreshControl } from 'react-native'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { LoadingScreen } from './LoadingScreen';
import { BeerContext } from '../context/beerContext/BeerContext';

import ListItemVotes from '../components/ListItemVotes';
import { waitFor } from '../helpers/helpers';
import { useIsFocused } from '@react-navigation/native';
import { BeerCollection } from '../interfaces/Beers';

interface Props {
  navigation: DrawerNavigationHelpers;
};

export const UserCreatedBeersScreen = ({ navigation }: Props) => {
  const { beers, getBeers, getUserNewBeers, isLoading } = useContext(BeerContext);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const [userBeers, setUserBeers] = useState<BeerCollection[]>([]);

  useEffect(() => {
    if (beers.length === 0) {
      fillBeers();
    }
    if (isFocused) {
      getCreatedBeers();
    }
  }, [isFocused]);

  const getCreatedBeers = async () => {
    const beerss = await getUserNewBeers();
    setUserBeers(beerss);
  };

  const fillBeers = async () => {
    await getBeers();
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await waitFor(300);

    await getCreatedBeers();
    setIsRefreshing(false);
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
        source={require('../images/sunset.jpg')}
        resizeMode="cover"
      />

      <DrawerToggleButton navigation={navigation} />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            progressViewOffset={10}
            progressBackgroundColor={'rgb(219, 192, 118)'}
            colors={['white', 'rgb(219, 192, 118)']}
          />
        }
        style={{
          paddingHorizontal: 15,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          width: '100%',
        }}
        numColumns={2}
        data={userBeers}
        keyExtractor={(beer: any) => beer.name!}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListHeaderComponent={(
          <View style={{ flexDirection: 'row', paddingVertical: 25 }}>
            <Text style={{ fontFamily: 'JosefinBold', fontSize: 23, color: 'rgba(255,255,255, 1)', }}>Cervezas Agregadas</Text>
          </View>
        )}
        ListFooterComponent={(<View style={{ height: 80 }} />)}
        renderItem={({ item }) => {
          return <ListItemVotes beer={item} url="UserCreatedBeersScreen" />
        }}
      />
      {
        isLoading
          ? <LoadingScreen />
          : <DrawerToggleButton navigation={navigation} />
      }

    </>
  );
};