import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, RefreshControl, Text, ImageBackground, useWindowDimensions } from 'react-native';

import { ListItemTopBeer } from '../components/ListItemTopBeer';
import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { BeerContext } from '../context/beerContext/BeerContext';
import { LoadingScreen } from './LoadingScreen';
import { waitFor } from '../helpers/helpers';

interface Props {
  navigation: DrawerNavigationHelpers,
};

export const TopBeers = ({ navigation }: Props) => {
  const { beers, getBeers, isLoading } = useContext(BeerContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (beers.length > 0) return;
    getBeers();
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await waitFor(300);

    await getBeers();
    setIsRefreshing(false);
  };

  return (
    <>
      <ImageBackground style={{ height, width, alignItems: 'center', flex: 1, }} source={require('../images/bar.jpg')} resizeMode="cover">

        <FlatList
          style={{
            paddingHorizontal: 15,
            backgroundColor: 'rgba(221, 204, 157, 0.2)',
            width: '100%',
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
          data={beers.slice(0, 50)}
          keyExtractor={(beer: any) => beer.name!}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={(
            <View style={{ flexDirection: 'row', paddingVertical: 25 }}>
              <Text style={{ fontFamily: 'JosefinBold', fontSize: 25, color: 'rgba(255,255,255, 1)', }}>Top 50</Text>
            </View>
          )}
          ListFooterComponent={(<View style={{ height: 80 }} />)}
          renderItem={({ item, index }) => {
            return <ListItemTopBeer item={item} index={index} top />
          }}
        />
        {
          isLoading
            ? <LoadingScreen />
            : <DrawerToggleButton navigation={navigation} />
        }
      </ImageBackground>
    </>
  );
};