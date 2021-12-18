import React, { useState } from 'react'
import { View, FlatList, RefreshControl, Text } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { ListItemTopBeer } from '../components/ListItemTopBeer';
import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { useBeer } from '../hooks/useBeer';

export const TopBeers = ({ ...props }: DrawerContentComponentProps) => {
  const { beers, getBeers } = useBeer();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(async () => {
      await getBeers();
      setIsRefreshing(false);
    }, 300);
  };

  return (
    <>
      <DrawerToggleButton {...props} />
      <FlatList
        style={{
          paddingHorizontal: 15,
          backgroundColor: 'rgba(221, 204, 157, 0.3)'
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
        data={beers}
        keyExtractor={(beer: any) => beer.name!}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={(
          <View style={{ flexDirection: 'row', paddingVertical: 25 }}>
            <Text style={{ fontFamily: 'JosefinBold', fontSize: 25, color: 'rgba(104, 77, 0, 1)', }}>Top 50</Text>
          </View>
        )}
        ListFooterComponent={(<View style={{ height: 80 }} />)}
        renderItem={({ item, index }) => {
          return <ListItemTopBeer item={item} index={index} top />
        }}
      />
    </>
  );
};