import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Platform, StyleProp, ViewStyle, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

interface Props {
  style?: StyleProp<ViewStyle>;
  onDebounce: (value: string) => void;
  textValue: string;
  setTextValue: (value: string) => void;
}
const SearchInput = ({ style, onDebounce, textValue, setTextValue }: Props) => {
  const { debouncedValue } = useDebouncedValue(textValue);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{
        ...styles.container,
        ...style as any,
      }}>
        <View style={styles.textBackground}>
          <TextInput
            placeholderTextColor="rgba(0,0,0,0.3)"
            placeholder="Buscar cerveza"
            style={{
              ...styles.textInput,
              top: Platform.OS === 'ios' ? 0 : 1,
              fontFamily: 'JosefinRegular'
            }}
            autoCapitalize="none"
            autoCorrect={false}
            value={textValue}
            onChangeText={setTextValue}
            autoCompleteType="off"
          />
          <Icon
            name="search-outline"
            color="rgba(0,0,0,0.23)"
            size={20}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 35,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  textInput: {
    flex: 1,
    marginBottom: -2,
    fontSize: 15,
    color: 'grey',
  },
});
