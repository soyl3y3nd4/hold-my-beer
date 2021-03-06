import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

interface Props {
  navigation: DrawerNavigationHelpers;
  tablet?: boolean;
};

export const DrawerToggleButton = ({ navigation, tablet }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.toggleDrawer()}
      style={{
        position: 'absolute',
        top: 26,
        right: Dimensions.get('screen').width > 500 && tablet ? 340 : 15,
        zIndex: 101,
        backgroundColor: 'rgba(255, 175, 0, 0.8)',
        borderRadius: 5,
        height: 32,
        padding: 0,
      }}
    >
      <Icon name="menu" size={35} color="rgba(255,255,255,0.85)" style={{ top: -2.5, }} />
    </TouchableOpacity>
  );
};
