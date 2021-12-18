import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { ProfileScreen } from '../screens/ProfileScreen';
import BottomTabsNavigator from './BottomTabsNavigator';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ImageBackground } from 'react-native';
import { AuthContext } from '../context/authContext/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { width } = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuContent {...props} />}
      screenOptions={{
        drawerType: width >= 768 ? 'permanent' : 'front',
        headerShown: false
      }}
    >
      <Drawer.Screen name="BottomTabsNavigator" component={BottomTabsNavigator} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const MenuContent = ({ navigation }: DrawerContentComponentProps) => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
      <ImageBackground
        source={require('../images/header_2.jpg')}
        style={styles.avatarContainer}
      >
        <View style={{
          position: 'absolute',
          left: 20,
          top: 20,
          width: 70,
          height: 70,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.85)',
          elevation: 5,
        }} >
          <Image
            source={require('../images/avatar.jpg')} style={{
              resizeMode: 'contain',
              width: '100%',
              height: '100%',
              borderRadius: 100,
            }} />
        </View>

        {user?.email && user?.metadata?.creationTime && (
          <>
            <Text style={{
              position: 'absolute',
              bottom: 20,
              left: 10,
              fontSize: 13,
              marginLeft: 20,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'right',
              fontFamily: 'Readex',
            }}>
              {user?.email}
            </Text>
            <Text style={{
              position: 'absolute',
              bottom: 5,
              left: 10,
              fontSize: 11,
              marginLeft: 20,
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'right',
              fontFamily: 'Readex',
            }}>
              Miembro desde: {new Date(user.metadata.creationTime).toLocaleDateString()}
            </Text>
          </>
        )
        }
      </ImageBackground>

      <View style={styles.menuContainer}>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('BottomTabsNavigator')}
            style={styles.menuButton}
          >
            <Icon name="home-outline" size={35} color="rgba(0, 0, 0, 0.5)" />
            <Text style={styles.menuItem}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProfileScreen')}
            style={styles.menuButton}
          >
            <Icon name="person-outline" size={35} color="rgba(0, 0, 0, 0.5)" />
            <Text style={styles.menuItem}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProfileScreen')}
            style={styles.menuButton}
          >
            <Icon name="settings-outline" size={35} color="rgba(0, 0, 0, 0.5)" />
            <Text style={styles.menuItem}>Ajustes</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={logOut}
            style={{
              ...styles.menuButton,
              marginBottom: 200,
            }}>

            <Icon name="log-in-outline" size={35} color="rgba(0, 0, 0, 0.5)" />
            <Text style={styles.menuItem}>Salir</Text>
          </TouchableOpacity>

        </View>
      </View>
    </DrawerContentScrollView >
  );
};

export const styles = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  bottomBarStyles: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderTopColor: 'white',
    paddingBottom: 13,
    height: 60,
    elevation: 0
  },
  topBarStyles: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    borderBottomColor: 'white',
    elevation: 0,
    shadowColor: 'transparent',
  },
  title: {
    fontSize: 30,
    marginBottom: 15,
  },
  bigButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 20,
    justifyContent: 'center',
    height: 100,
    marginRight: 10,
    width: 100,
  },
  bigButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  avatarContainer: {
    top: -5,
    backgroundColor: 'rgba(255, 255, 255,1)',
    display: 'flex',
    flexDirection: 'row',
    elevation: 8,
    paddingTop: 13,
    paddingBottom: 7,
    paddingHorizontal: 15,
    height: 160,
  },
  avatar: {
    width: 30,
    height: 47,
    // marginRight: 20,
    // marginLeft: 20,
  },
  username: {
    color: 'white',
    fontFamily: 'Source Sans Pro',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 15,
  },
  menuContainer: {
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 20,
    height: '100%',
  },
  menuButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuItem: {
    fontFamily: 'Readex',
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 18,
    letterSpacing: 1.2,
    marginLeft: 20
  },
});