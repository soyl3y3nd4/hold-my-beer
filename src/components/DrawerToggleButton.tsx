import React from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

interface Props {
  navigation: DrawerNavigationHelpers
};

export const DrawerToggleButton = ({ navigation }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={() => navigation.toggleDrawer()}
      style={{
        position: 'absolute',
        top: 26,
        right: 15,
        zIndex: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
        height: 32,
        padding: 0,
      }}
    >
      <Icon name="menu" size={40} color="white" style={{ top: -5, }} />
    </TouchableOpacity>
  );
};
