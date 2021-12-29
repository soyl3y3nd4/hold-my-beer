import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';

export const LoadingScreen = () => {
  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200
    );
    return () => cancelAnimation(rotation);
  }, []);

  return (
    <View style={styles.container}>
      {/* <ActivityIndicator color="rgb(201, 165, 34)" size={100} /> */}
      <Animated.View style={[styles.spinner, animatedStyles]} />
      <LottieView
        source={require('../../assets/lottie/beer_loading.json')}
        autoPlay
        loop
        style={{
          width: 30,
          top: -24,
        }}
        speed={1.9}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  spinner: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderTopColor: '#f5f5f5',
    borderRightColor: '#f5f5f5',
    borderBottomColor: '#f5f5f5',
    borderLeftColor: 'rgb(255, 204, 0)',
  },
});