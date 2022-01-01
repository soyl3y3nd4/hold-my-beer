import React from 'react';
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
        zIndex: 101,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 5,
        height: 32,
        padding: 0,
      }}
    >
      <Icon name="menu" size={35} color="rgba(255,255,255,1)" style={{ top: -2.5, }} />
    </TouchableOpacity>
  );
};
