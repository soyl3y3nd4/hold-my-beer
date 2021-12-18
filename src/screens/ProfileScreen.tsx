import React, { useContext } from 'react'
import { Text, View } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { AuthContext } from '../context/authContext/AuthContext';

export const ProfileScreen = ({ ...props }: DrawerContentComponentProps) => {
  const { user } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      <DrawerToggleButton {...props} />
      <Text style={{ fontSize: 25, color: '#000000' }}>My profile</Text>
      <Text style={{ fontSize: 16, color: '#000000' }}>Hola {user?.email}!</Text>
    </View>
  );
};
