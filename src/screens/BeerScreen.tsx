import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParams } from '../navigator/Tab1';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends StackScreenProps<RootStackParams, 'BeerScreen'> { };

export const BeerScreen = ({ navigation, route }: Props) => {
  const { top } = useSafeAreaInsets();
  const { beer } = route.params;

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          ...styles.backButton,
          top: top + 12,
        }}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="arrow-back-outline"
          color="white"
          size={38}
        />
      </TouchableOpacity>
      <Text style={{ color: 'black', fontSize: 20 }}>{beer.name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({

  backButton: {
    position: 'absolute',
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
  },

});

