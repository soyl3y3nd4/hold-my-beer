import React, { createContext, CSSProperties, useEffect, useState } from 'react';
import { Keyboard, StyleProp, ViewStyle } from 'react-native';
import { AnimateStyle, Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type KeyboardContextProps = {
  boxAnimationLoginText: AnimateStyle<ViewStyle>;
  boxAnimationRegisterText: AnimateStyle<ViewStyle>;
};

const initialState = {
  boxAnimationLoginText: {
    marginBottom: 40,
  },
  boxAnimationRegisterText: {
    marginTop: 40,
  },
};

export const KeyboardContext = createContext(initialState as KeyboardContextProps);

export const KeyboardProvider = ({ children }: any) => {
  const boxMarginLogin = useSharedValue(40);
  const boxMarginRegister = useSharedValue(40);

  const boxAnimationLoginText = useAnimatedStyle(() => {
    return {
      marginBottom: withTiming(boxMarginLogin.value, { duration: 800, easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), }),
    }
  });

  const boxAnimationRegisterText = useAnimatedStyle(() => {
    return {
      marginTop: withTiming(boxMarginRegister.value, { duration: 800, easing: Easing.bezier(0.175, 0.885, 0.32, 1.275), }),
    }
  });

  useEffect(() => {
    goIdle();
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      moveTop();
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      goIdle();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const moveTop = () => {
    boxMarginLogin.value = 50;
    boxMarginRegister.value = 30;
  };

  const goIdle = () => {
    boxMarginLogin.value = 40;
    boxMarginRegister.value = 0;
  };

  return (
    <KeyboardContext.Provider value={{
      boxAnimationLoginText,
      boxAnimationRegisterText,
    }}>
      {children}
    </KeyboardContext.Provider>
  );
};