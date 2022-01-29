import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ImageBackground } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from 'react-native-vector-icons/Ionicons';

import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

import { AuthContext } from '../context/authContext/AuthContext';
import { ProfileScreen } from '../screens/ProfileScreen';
import { NewBeer } from '../screens/NewBeer';
import { SettingsScreen } from '../screens/SettingsScreen';
import { UserContext } from '../context/userContext/UserContext';
import TabDashboard from './TabDashboard';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { width } = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuContent {...props} />}
      screenOptions={{
        drawerType: width >= 768 ? 'permanent' : 'front',
        headerShown: false,
      }}

    >
      <Drawer.Screen name="TabDashboard" component={TabDashboard} />
      <Drawer.Screen name="Tab1" component={Tab1} />
      <Drawer.Screen name="Tab2" component={Tab2} />
      <Drawer.Screen name="Tab3" component={Tab3} />
      <Drawer.Screen name="NewBeer" component={NewBeer} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const MenuContent = ({ navigation, state }: DrawerContentComponentProps) => {
  const { user, logOut } = useContext(AuthContext);
  const { avatar } = useContext(UserContext);
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
            source={avatar ?
              { uri: avatar }
              : require('../images/avatars/default_avatar.jpg')
            } style={{
              resizeMode: 'contain',
              width: '100%',
              height: '100%',
              borderRadius: 100,
            }}
          />
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
            onPress={() => navigation.navigate('TabDashboard')}
            style={[styles.menuButton]}
          >
            <Icon name="home-outline" size={30} color={state.index === 0 ? 'rgb(226, 189, 0)' : 'rgba(0, 0, 0, 0.5)'} />
            <Text style={[styles.menuItem, state.index === 0 ? styles.menuItemActive : null]}>Panel Principal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Tab1')}
            style={styles.menuButton}
          >
            <Icon
              name="trending-up-outline"
              size={23}
              style={{ width: 30 }}
              color={state.index === 1 ? 'rgb(226, 189, 0)' : 'rgba(0, 0, 0, 0.5)'}
            />
            <Icon
              style={[{
                position: 'absolute',
                bottom: 18,
                left: 21,
                zIndex: 14,
                transform: [
                  { scaleX: -1 },
                ],
                fontSize: 8,
              }]}
              name="beer-outline"
              size={15}
              color={state.index === 1 ? 'rgba(226, 189, 0, 0.7)' : 'rgba(0, 0, 0, 0.3)'}
            />
            <Text style={[styles.menuItem, state.index === 1 ? styles.menuItemActive : null]}>Top Cervezas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Tab2')}
            style={styles.menuButton}
          >
            <Icon name="search" size={30} color={state.index === 2 ? 'rgb(226, 189, 0)' : 'rgba(0, 0, 0, 0.5)'} />
            <Icon
              style={[{
                position: 'absolute',
                bottom: 14,
                left: 9,
                zIndex: 14,
                transform: [
                  { scaleX: -1 },
                  { rotate: '-35deg' }
                ],
                fontSize: 8,
              }]}
              name="beer-outline"
              size={15}
              color={state.index === 2 ? 'rgba(226, 189, 0, 0.7)' : 'rgba(0, 0, 0, 0.3)'}
            />
            <Text style={[styles.menuItem, state.index === 2 ? styles.menuItemActive : null]}>Buscar Cerveza</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Tab3')}
            style={styles.menuButton}
          >
            <View style={{ width: 30 }}>
              <MaterialIcon
                name="account-tie"
                style={[{ position: 'absolute', bottom: -10, left: 0, zIndex: 14, fontSize: 25 }]}
                color={state.index === 3 ? 'rgb(226, 189, 0)' : 'rgba(0, 0, 0, 0.5)'}
              />
              <Icon
                style={[{
                  position: 'absolute',
                  bottom: 0,
                  left: 18,
                  zIndex: 14,
                  transform: [
                    { scaleX: -1 }
                  ],
                  fontSize: 12
                }]}
                name="beer-outline"
                size={15}
                color={state.index === 3 ? 'rgba(226, 189, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)'}
              />
            </View>
            <Text style={[styles.menuItem, state.index === 3 ? styles.menuItemActive : null]}>Mis Cervezas</Text>

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('NewBeer')}
            style={styles.menuButton}
          >
            <Icon name="beer-outline" size={30} color={state.index === 4 ? 'rgb(226, 189, 0)' : 'rgba(0, 0, 0, 0.5)'} />
            <Text style={[styles.menuItem, state.index === 4 ? styles.menuItemActive : null]}>Nueva Cerveza</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProfileScreen')}
            style={styles.menuButton}
          >
            <Icon name="person-outline" size={30} color={state.index === 5 ? 'rgb(226, 189, 0)' : 'rgba(0, 0, 0, 0.5)'} />
            <Text style={[styles.menuItem, state.index === 5 ? styles.menuItemActive : null]}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SettingsScreen')}
            style={styles.menuButton}
          >
            <Icon name="settings-outline" size={30} color={state.index === 6 ? 'rgb(226, 189, 0)' : 'rgba(0, 0, 0, 0.5)'} />
            <Text style={[styles.menuItem, state.index === 6 ? styles.menuItemActive : null]}>Ajustes</Text>
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

            <Icon name="log-in-outline" size={30} color="rgba(0, 0, 0, 0.5)" />
            <Text style={[styles.menuItem]}>Salir</Text>
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
  menuItemActive: {
    color: 'rgb(226, 189, 0)',
  },
  menuItem: {
    fontFamily: 'Readex',
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 14,
    letterSpacing: 1.2,
    marginLeft: 20
  },
});