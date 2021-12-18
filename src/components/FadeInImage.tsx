import React, { useState } from 'react'
import { ActivityIndicator, Animated, ImageErrorEventData, ImageSourcePropType, ImageStyle, NativeSyntheticEvent, StyleProp, View } from 'react-native'
import { useAnimation } from '../hooks/useAnimation';

interface Props {
  uri?: string;
  style?: StyleProp<ImageStyle>;
  image?: ImageSourcePropType;
}

export const FadeInImage = ({ uri = '', style = {}, image }: Props) => {
  const { opacity, fadeIn } = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
    setIsLoading(false);
  };

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      ...style as any,
    }}>

      {
        isLoading &&
        <ActivityIndicator
          style={{ position: 'absolute' }}
          color="grey"
          size={30}
        />
      }
      {
        uri.length > 0
          ? (
            <Animated.Image
              source={{ uri }}
              onError={onError}
              onLoad={finishLoading}
              style={{
                ...style as any,
                opacity
              }}
            />
          )
          : (
            <Animated.Image
              source={image!}
              onError={onError}
              onLoad={finishLoading}
              style={{
                ...style as any,
                opacity
              }}
            />
          )
      }


    </View>
  );
};