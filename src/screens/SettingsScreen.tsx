import React from 'react';
import { Dimensions, ImageBackground, Text, View, ScrollView } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

interface Props {
  navigation: DrawerNavigationHelpers
};

export const SettingsScreen = ({ navigation }: Props) => {
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
        source={require('../images/settings.jpg')}
        resizeMode="cover"
      />
      <DrawerToggleButton navigation={navigation} />
      <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'JosefinBold', fontSize: 20, color: 'white', marginTop: 26, marginBottom: 30, }}>Ajustes</Text>

        </View>
      </ScrollView>
    </>
  );
};
