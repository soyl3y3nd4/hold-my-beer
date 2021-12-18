import { useState } from 'react';
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

export const useAnimatedBorder = () => {
  const [userColor, setUserColor] = useState('rgba(255, 255, 255, 0.3)');

  const progress = useDerivedValue(() => {
    return withTiming(userColor === 'rgba(255, 255, 255, 0.3)' ? 1 : 0);
  });

  const rStyle = useAnimatedStyle(() => {
    const borderBottomColor = interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(255, 255, 255, 0.85)', 'rgba(255, 255, 255, 0.3)']
    );

    return {
      borderBottomColor,
    };
  });

  return {
    rStyle,
    userColor,
    setUserColor,
  };
};