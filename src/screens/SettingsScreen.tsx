import React from 'react';
import { Text, View } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerToggleButton } from '../components/DrawerToggleButton';

export const SettingsScreen = ({ ...props }: DrawerContentComponentProps) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <DrawerToggleButton {...props} />
      <Text style={{ fontSize: 25, color: '#000000' }}>Settings</Text>
    </View>
  );
};
