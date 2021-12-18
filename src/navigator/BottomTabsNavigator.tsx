import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, Easing, View, TouchableOpacity, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FindBeer } from '../screens/FindBeer';
import { NewBeer } from '../screens/NewBeer';
import { Dashboard } from '../screens/Dashboard';
import Icon from 'react-native-vector-icons/Ionicons';
import { TopBeers } from '../screens/TopBeers';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = ({ ...props }: DrawerContentComponentProps) => {
  const [focusedTab, setFocusedTab] = useState(0);
  const mappable = [0, 1, 2, 3];

  const pages = [
    {
      name: "Dashboard",
      component: () => <Dashboard {...props} />,
      icon: 'home-sharp',
    },
    {
      name: "TopBeers",
      component: () => <TopBeers {...props} />,
      icon: 'trending-up',
    },
    {
      name: "FindBeer",
      component: () => <FindBeer {...props} setFocusedTab={setFocusedTab} />,
      icon: 'search',
    },
    {
      name: "NewBeer",
      component: () => <NewBeer {...props} />,
      icon: 'add-circle',
    },
  ];

  const colors = mappable.map((item, index) => {
    return useState(index === focusedTab
      ? new Animated.Value(1)
      : new Animated.Value(0))[0]
  });

  const iconSizes = mappable.map((item, index) => {
    return useState(index === focusedTab
      ? new Animated.Value(40)
      : new Animated.Value(28))[0]
  });

  const boxSizes = mappable.map((item, index) => {
    return useState(index === focusedTab
      ? new Animated.Value(70)
      : new Animated.Value(50))[0]
  });

  const topMargins = mappable.map((item, index) => {
    return useState(index === focusedTab
      ? new Animated.Value(-45)
      : new Animated.Value(-10))[0]
  });

  const opacities = mappable.map((item, index) => {
    return useState(index === focusedTab
      ? new Animated.Value(1)
      : new Animated.Value(0))[0]
  });

  const elevations = mappable.map((item, index) => {
    return useState(index === focusedTab
      ? new Animated.Value(1)
      : new Animated.Value(0))[0]
  });

  useEffect(() => {
    colors.forEach((c, index) => {
      let value = focusedTab === index ? 1 : 0
      Animated.timing(c, {
        toValue: value,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
    });

    iconSizes.forEach((s, index) => {
      let value = focusedTab === index ? 28 : 22
      Animated.timing(s, {
        toValue: value,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
    });

    boxSizes.forEach((s, index) => {
      let value = focusedTab === index ? 50 : 45
      Animated.timing(s, {
        toValue: value,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
    });

    topMargins.forEach((s, index) => {
      let value = focusedTab === index ? -15 : 10
      Animated.timing(s, {
        toValue: value,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
    });

    opacities.forEach((s, index) => {
      let value = focusedTab === index ? 1 : 0.9
      Animated.timing(s, {
        toValue: value,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
    });

    elevations.forEach((s, index) => {
      let value = focusedTab === index ? 3 : 0.5
      Animated.timing(s, {
        toValue: value,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
    });

  }, [focusedTab]);

  const bgColorAnimation = (c: any) => c.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(107,91,91)", "rgba(211, 157, 0, 1)"]
  });

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.bottomBars,
        },
      }}
    >
      {pages.map((page, index) => (
        <Tab.Screen
          key={"tab-" + index}
          name={page.name}
          listeners={{
            tabPress: (e) => {
              setFocusedTab(index);
            },
          }}
          options={{
            tabBarIcon: ({ focused }) => (
              <Animated.View style={{
                backgroundColor: bgColorAnimation(colors[index]),
                marginTop: topMargins[index],
                width: boxSizes[index],
                height: boxSizes[index],
                opacity: opacities[index],
                borderRadius: 50,
                alignItems: "center",
                justifyContent: 'center',
                elevation: elevations[index],
              }}>
                <Animated.Text
                  style={{
                    fontSize: iconSizes[index],
                  }}>
                  <AnimatedIcon
                    name={page.icon}
                    color={focused ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)"}
                    style={{
                      fontSize: iconSizes[index],
                    }}
                  />
                </Animated.Text>
              </Animated.View>
            )
          }}
        >
          {page.component}
        </Tab.Screen>)
      )}
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
    backgroundColor: 'transparent',
    height: 60,
  }
});

export default BottomTabsNavigator;
