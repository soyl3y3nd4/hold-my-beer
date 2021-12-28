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

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = ({ ...props }: DrawerContentComponentProps) => {
  const { boxAnimation, goIdle, moveTop, iconAnimation } = useTabAnimation();
  const { boxAnimation: boxAnimation1, goIdle: goIdle1, moveTop: moveTop1, iconAnimation: iconAnimation1 } = useTabAnimation();
  const { boxAnimation: boxAnimation2, goIdle: goIdle2, moveTop: moveTop2, iconAnimation: iconAnimation2 } = useTabAnimation();
  const { boxAnimation: boxAnimation3, goIdle: goIdle3, moveTop: moveTop3, iconAnimation: iconAnimation3 } = useTabAnimation();

  useEffect(() => {
    moveTop();
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
      })}
    >
      <Tab.Screen
        name="Dashboard"
        children={() => <Dashboard {...props} />}
        listeners={{ focus: () => moveTop(), blur: () => goIdle() }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={[styles.box, boxAnimation]}>
              <AnimatedIcon
                name="home"
                style={[iconAnimation]}
                color={focused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)'}
              />
            </Animated.View>
          )
        }}
      />
      <Tab.Screen
        name="TopBeers"
        children={() => <TopBeers {...props} />}
        listeners={{ focus: () => moveTop1(), blur: () => goIdle1() }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={[styles.box, boxAnimation1]}>
              <AnimatedIcon
                name="trending-up"
                style={[iconAnimation1]}
                color={focused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)'}
              />
            </Animated.View>
          )
        }}
      />
      <Tab.Screen
        name="FindBeer"
        children={() => <FindBeer {...props} setFocusedTab={moveTop3} />}
        listeners={{ focus: () => moveTop2(), blur: () => goIdle2() }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={[styles.box, boxAnimation2]}>
              <AnimatedIcon
                name="search"
                style={[iconAnimation2]}
                color={focused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)'}
              />
            </Animated.View>
          )
        }}
      />
      <Tab.Screen
        name="NewBeer"
        children={() => <NewBeer {...props} />}
        listeners={{ focus: () => moveTop3(), blur: () => goIdle3() }}
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View style={[styles.box, boxAnimation3]}>
              <AnimatedIcon
                name="add-circle"
                style={[iconAnimation3]}
                color={focused ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)'}
              />
            </Animated.View>
          )
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
    backgroundColor: 'rgba(211, 157, 0, 1)',
    borderRadius: 50,
    // margin: 100,
    // padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default BottomTabsNavigator;
