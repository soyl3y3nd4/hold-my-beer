import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import LottieView from 'lottie-react-native';

export const LoadingScreen = () => {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.65)',
      width: '100%',
      height: '100%',
      position: 'absolute',
    }}>
      {/* <ActivityIndicator color="rgb(201, 165, 34)" size={100} /> */}
      <LottieView
        source={require('../../assets/lottie/beer_loading.json')}
        autoPlay
        loop
        style={{
          width: 40,
          top: -1,
        }}
        speed={1.9}
      />
      <LottieView
        source={require('../../assets/lottie/spinner.json')}
        autoPlay
        loop
        style={{
          width: 100,
          top: -35,
        }}
      />
    </View>
  );
};