import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Dashboard } from '../screens/Dashboard';
import Icon from 'react-native-vector-icons/Ionicons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialCommunityIcon);

import Animated from 'react-native-reanimated';
import { useTabAnimation } from '../hooks/useTabAnimation';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

import { FavouritesScreen } from '../screens/FavouritesScreen';
import { VotesScreen } from '../screens/VotesScreen';
import { UserCreatedBeersScreen } from '../screens/UserCreatedBeersScreen';

const Tab = createBottomTabNavigator();

interface Props {
  navigation: DrawerNavigationHelpers
}

const BottomTabsNavigator = ({ navigation }: Props) => {
  const {
    boxAnimation,
    goIdle,
    moveTop,
    iconAnimation,
    backgroundAnimation
  } = useTabAnimation();
  const {
    boxAnimation: boxAnimation1,
    goIdle: goIdle1,
    moveTop: moveTop1,
    iconAnimation: iconAnimation1,
    backgroundAnimation: backgroundAnimation1
  } = useTabAnimation();
  const {
    boxAnimation: boxAnimation2,
    goIdle: goIdle2,
    moveTop: moveTop2,
    iconAnimation: iconAnimation2,
    backgroundAnimation: backgroundAnimation2
  } = useTabAnimation();
  const {
    boxAnimation: boxAnimation3,
    goIdle: goIdle3,
    moveTop: moveTop3,
    iconAnimation: iconAnimation3,
    smallIconAnimation,
    backgroundAnimation: backgroundAnimation3,
  } = useTabAnimation();

  useEffect(() => {
    moveTop();
    goIdle1();
    goIdle2();
    goIdle3();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="FavouritesScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.bottomBars,
        },
        lazy: true,
        optimizationsEnabled: true,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        children={() => <Dashboard navigation={navigation} />}
        listeners={{ focus: () => moveTop(), blur: () => goIdle() }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={[styles.box, boxAnimation, backgroundAnimation]}>
              <AnimatedIcon
                name="home"
                style={[iconAnimation]}
                color={focused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)'}
              />
            </Animated.View>
          ),
          lazy: true,
        }}
      />
      <Tab.Screen
        name="FavouritesScreen"
        children={() => <FavouritesScreen navigation={navigation} />}
        listeners={{ focus: () => moveTop1(), blur: () => goIdle1() }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={[styles.box, boxAnimation1, backgroundAnimation1]}>
              <AnimatedIcon
                name="heart-outline"
                style={[iconAnimation1]}
                color={focused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)'}
              />
            </Animated.View>
          ),
          lazy: true,
        }}
      />
      {/* <Tab.Screen
        name="VotesScreen"
        children={() => <VotesScreen navigation={navigation} />}
        listeners={{ focus: () => moveTop2(), blur: () => goIdle2() }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={[styles.box, boxAnimation2, backgroundAnimation2]}>
              <AnimatedMaterialIcon
                name="account-star-outline"
                style={[iconAnimation2]}
                color={focused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)'}
              />
            </Animated.View>
          ),
          lazy: true,
        }}
      />

      <Tab.Screen
        name="UserBeersScreen"
        children={() => <UserCreatedBeersScreen navigation={navigation} />}
        listeners={{ focus: () => moveTop3(), blur: () => goIdle3() }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={[styles.box, boxAnimation3, backgroundAnimation3]}>
              <AnimatedMaterialIcon
                name="account-tie"
                style={[iconAnimation3, { position: 'absolute', bottom: 10, left: 6, zIndex: 14 }]}
                color={focused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)'}
              />
              <AnimatedMaterialIcon
                name="glass-mug-variant"
                style={[smallIconAnimation, { position: 'absolute', bottom: 20, zIndex: 14 }]}
                color={focused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)'}
              />
            </Animated.View>
          ),
          lazy: true,
        }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomBars: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 0,
    borderTopWidth: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: 60,
    borderRadius: 20,
  },
  box: {
    width: 50,
    height: 50,
    // backgroundColor: 'rgba(211, 157, 0, 1)',
    borderRadius: 50,
    // margin: 100,
    // padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 904,
  }
});

export default BottomTabsNavigator;
