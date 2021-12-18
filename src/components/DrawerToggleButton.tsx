import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const DrawerToggleButton = ({ navigation }: DrawerContentComponentProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={() => navigation.toggleDrawer()}
      style={{
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 3,
      }}
    >
      <Icon name="menu" size={50} color="rgba(211, 157, 0, 1)" />
    </TouchableOpacity>
  );
};
