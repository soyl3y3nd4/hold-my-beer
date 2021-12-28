import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Image, ScrollView, RefreshControl, ImageBackground, useWindowDimensions } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { BeerCollection } from '../interfaces/Beers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { LoadingScreen } from './LoadingScreen';

export const Dashboard = ({ ...props }: DrawerContentComponentProps) => {
  const { height, width } = useWindowDimensions();

  return (
    <ScrollView>
      <ImageBackground style={{ height, width, alignItems: 'center', flex: 1, }} source={require('../images/sunset.jpg')} resizeMode="cover">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(221, 204, 157, 0.5)', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, }}>
          <DrawerToggleButton {...props} />
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};