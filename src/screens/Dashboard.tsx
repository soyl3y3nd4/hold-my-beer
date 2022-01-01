import React from 'react'
import { Text, View, ScrollView, ImageBackground, Dimensions } from 'react-native'
import { } from '@react-navigation/drawer';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { DrawerToggleButton } from '../components/DrawerToggleButton';

interface Props {
  navigation: DrawerNavigationHelpers
};

export const Dashboard = ({ navigation }: Props) => {

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
      <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(221, 204, 157, 0.5)', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
          <Text style={{ fontSize: 25, color: '#000000' }}>Dashboard</Text>
        </View>
      </ScrollView>
    </>
  );
};