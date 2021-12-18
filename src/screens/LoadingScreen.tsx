import React from 'react'
import { ActivityIndicator, View } from 'react-native'

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
      <ActivityIndicator color="orange" size={70} />
    </View>
  );
};