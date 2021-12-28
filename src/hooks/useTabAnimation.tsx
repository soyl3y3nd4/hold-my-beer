import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const useTabAnimation = () => {
  const boxMargin = useSharedValue(0);
  const opacity = useSharedValue(0.7);
  const elevation = useSharedValue(0);
  const width = useSharedValue(50);
  const height = useSharedValue(50);
  const fontSize = useSharedValue(20);

  // creating worklet via useAnimatedStyle, and incorporating the withTiming method
  const boxAnimation = useAnimatedStyle(() => {
    return {
      marginBottom: withTiming(boxMargin.value, { duration: 250, easing: Easing.bezier(0.5, 0.01, 0, 1), }),
      opacity: withTiming(opacity.value, { duration: 250, easing: Easing.bezier(0.5, 0.01, 0, 1), }),
      elevation: withTiming(elevation.value, { duration: 250, easing: Easing.bezier(0.5, 0.01, 0, 1), }),
      height: withTiming(height.value, { duration: 250, easing: Easing.bezier(0.5, 0.01, 0, 1), }),
      width: withTiming(width.value, { duration: 250, easing: Easing.bezier(0.5, 0.01, 0, 1), }),
    }
  });

  const iconAnimation = useAnimatedStyle(() => {
    return {
      fontSize: withTiming(fontSize.value, { duration: 250, easing: Easing.bezier(0.5, 0.01, 0, 1), }),
    }
  });

  const moveTop = () => {
    boxMargin.value = 60;
    opacity.value = 1;
    elevation.value = 5;
    height.value = 50;
    width.value = 50;
    fontSize.value = 27;
  };
  const goIdle = () => {
    boxMargin.value = 0;
    opacity.value = 0.7;
    elevation.value = 0;
    height.value = 40;
    width.value = 40;
    fontSize.value = 20;
  };


  return {
    moveTop,
    goIdle,
    boxAnimation,
    iconAnimation,
  };
};