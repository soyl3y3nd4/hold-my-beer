import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FindBeer } from '../screens/FindBeer';
import { NewBeer } from '../screens/NewBeer';
import { Dashboard } from '../screens/Dashboard';
import Icon from 'react-native-vector-icons/Ionicons';
import { TopBeers } from '../screens/TopBeers';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { useTabAnimation } from '../hooks/useTabAnimation';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import Tab1 from './Tab1';
import Tab2 from './Tab2';

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

  useEffect(() => {
    moveTop();
    goIdle1();
    goIdle2();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
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
        name="StackTopBeers"
        children={() => <Tab1 navigation={navigation} />}
        listeners={{ focus: () => moveTop1(), blur: () => goIdle1() }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={[styles.box, boxAnimation1, backgroundAnimation1]}>
              <AnimatedIcon
                name="trending-up"
                style={[iconAnimation1]}
                color={focused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)'}
              />
            </Animated.View>
          ),
          lazy: true,
        }}
      />
      <Tab.Screen
        name="StackFindBeer"
        children={() => <Tab2 navigation={navigation} />}
        listeners={{ focus: () => moveTop2(), blur: () => goIdle2() }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={[styles.box, boxAnimation2, backgroundAnimation2]}>
              <AnimatedIcon
                name="search"
                style={[iconAnimation2]}
                color={focused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)'}
              />
            </Animated.View>
          ),
          lazy: true,
        }}
      />

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
  }
});

export default BottomTabsNavigator;
