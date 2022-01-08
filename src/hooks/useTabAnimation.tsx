import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export const useTabAnimation = () => {
  const boxMargin = useSharedValue(0);
  const opacity = useSharedValue(0.7);
  const elevation = useSharedValue(0);
  const width = useSharedValue(50);
  const height = useSharedValue(50);
  const fontSize = useSharedValue(20);
  const smallfontSize = useSharedValue(13);
  const right = useSharedValue(7);

  // creating worklet via useAnimatedStyle, and incorporating the withTiming method
  const boxAnimation = useAnimatedStyle(() => {
    return {
      marginBottom: withTiming(boxMargin.value, { duration: 250, easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), }),
      opacity: withTiming(opacity.value, { duration: 2000, easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), }),
      elevation: withTiming(elevation.value, { duration: 250, easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), }),
      height: withTiming(height.value, { duration: 250, easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), }),
      width: withTiming(width.value, { duration: 250, easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), }),
    }
  });

  const iconAnimation = useAnimatedStyle(() => {
    return {
      fontSize: withTiming(fontSize.value, { duration: 250, easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), }),
    }
  });

  const smallIconAnimation = useAnimatedStyle(() => {
    return {
      fontSize: withTiming(smallfontSize.value, { duration: 250, easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), }),
      right: withTiming(right.value, { duration: 250, easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), }),
    }
  });

  const backgroundColor = useSharedValue(false);

  const backgroundAnimation = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value ? 'rgba(0, 0, 0, 1)' : 'rgba(211, 157, 0, 1)',
  }), []);

  const moveTop = () => {
    boxMargin.value = 60;
    opacity.value = 1;
    elevation.value = 5;
    height.value = 50;
    width.value = 50;
    fontSize.value = 27;
    smallfontSize.value = 15;
    right.value = 8;
    backgroundColor.value = false;
  };
  const goIdle = () => {
    boxMargin.value = 0;
    opacity.value = 0.7;
    elevation.value = 0;
    height.value = 40;
    width.value = 40;
    fontSize.value = 20;
    smallfontSize.value = 10;
    right.value = 7;
    backgroundColor.value = true;
  };


  return {
    moveTop,
    goIdle,
    boxAnimation,
    iconAnimation,
    smallIconAnimation,
    backgroundAnimation,
  };
};