import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Image, ScrollView, RefreshControl } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { BeerCollection } from '../interfaces/Beers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerToggleButton } from '../components/DrawerToggleButton';

export const Dashboard = ({ ...props }: DrawerContentComponentProps) => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <DrawerToggleButton {...props} />
      <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
    </View>
  );
};