import React from 'react'
import { Text, View, ScrollView, ImageBackground, useWindowDimensions } from 'react-native'
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { DrawerToggleButton } from '../components/DrawerToggleButton';

interface Props {
  navigation: DrawerNavigationHelpers
};

export const Dashboard = ({ navigation }: Props) => {
  const { height, width } = useWindowDimensions();

  return (
    <ScrollView>
      <ImageBackground style={{ height, width, alignItems: 'center', flex: 1, }} source={require('../images/sunset.jpg')} resizeMode="cover">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(221, 204, 157, 0.5)', position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, }}>
          <DrawerToggleButton navigation={navigation} />
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};