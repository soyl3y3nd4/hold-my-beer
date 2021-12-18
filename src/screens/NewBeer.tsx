import React, { useContext, useEffect } from 'react'
import { Animated, Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useIsFocused } from '@react-navigation/core';

import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/Ionicons';

import { AlertContext } from '../context/alertContext/AlertContext';
import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { useForm } from '../hooks/useForm';

const width = Dimensions.get('screen').width;

const initialState = {
  avb: '',
  short_description: '',
  description: '',
  first_brewed: '',
  ingredients: '',
  name: '',
  origin_country: '',
  city: '',
};

export const NewBeer = ({ ...props }: DrawerContentComponentProps) => {
  const {
    avb,
    short_description,
    description,
    first_brewed,
    ingredients,
    name,
    origin_country,
    onChange
  } = useForm(initialState);

  const { showAlert } = useContext(AlertContext);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (!isFocused) return;
  //   saveBeer();
  // }, [isFocused]);

  // const saveBeer = async () => {
  //   const ref = await firestore().collection('beers');
  //   const beer = await ref.doc('A.K.Damm').get();
  //   if (beer.data()) {
  //     return showAlert({
  //       isOpen: true,
  //       buttonText: 'CLOSE',
  //       message: 'Beer already exits!',
  //     });
  //   } else {
  //     ref.doc('A.K.Damm').set({
  //       description: 'A.K.Damm se lanzó en 2001 para celebrar el 125 aniversario y homenajear a nuestro fundador August Kuentzmann Damm: agua, malta de cebada, lúpulo y levadura. Una perfecta combinación del carácter alemán con la suavidad y el refinamiento francés. Resalta su sabor e imagen refinada con una cerveza con cuerpo. Destaca por su envase premium y único. Color caoba claro de reflejos tostados. Espuma ligeramente dorada. Limpia y brillante, con una burbuja densa y delicada. Se realzan los aromas especiados  y penetrantes.Las sensaciones de dulzor y amargor se equilibran con  una buena acidez y la sensación a levadura fresca.Los tostados y la salivación que provocan la dotan de una personalidad delicada y sabrosa.',
  //       abv: 4.8,
  //       ingredients: ['agua', 'malta de cebada', 'levadura', 'lúpulo'],
  //       first_brewed: 2001,
  //       image_url: 'https://vivonium.es/wp-content/uploads/2020/05/Comprar-Cerveza-AK-DAMM-Barata.jpg',
  //       name: 'A.K.Damm',
  //       short_description: 'A.K. Damm es nuestra cerveza 100% malta elaborada únicamente con agua, malta de cebada, lúpulo y levadura.'
  //     });
  //   }
  // };

  const onSubmitForm = () => {

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.mainContainer}
    >
      <DrawerToggleButton {...props} />
      <View style={{ paddingHorizontal: 15 }}>
        <View style={{ flexDirection: 'row', paddingVertical: 25 }}>
          <Text style={{ fontFamily: 'JosefinBold', fontSize: 25, color: 'rgba(104, 77, 0, 1)', }}>
            Nueva Cerveza
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            Nombre
          </Text>
          <TextInput
            style={styles.inputField}
            placeholder="Nombre"
            placeholderTextColor="rgba(0,0,0,0.1)"
            keyboardType="email-address"
            selectionColor="lightgrey"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onSubmitForm}
          />
          <View style={{
            height: 28,
            width: 28, paddingLeft: 2,
            backgroundColor: 'rgb(10, 201, 35)',
            borderRadius: 20,
            position: 'absolute',
            right: 14,
            top: 13.5
          }}>
            <Icon
              name="checkmark-circle-outline"
              size={26}
              color="rgba(255,255,255,0.5)"
            />
          </View>

        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            Tipo cerveza
          </Text>
          <TextInput
            style={styles.inputField}
            placeholder="Nombre"
            placeholderTextColor="rgba(0,0,0,0.1)"
            keyboardType="email-address"
            selectionColor="lightgrey"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onSubmitForm}
          />
        </View>

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(221, 204, 157, 0.3)',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(221, 204, 157, 1)',
    paddingHorizontal: 10,
    width: width - 30,
    marginBottom: 10,
    elevation: 5,
  },
  inputInfo: {
    fontFamily: 'JosefinBold',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)'
  },
  inputField: {
    fontSize: 16,
    paddingVertical: 5,
    width: '100%',
    color: 'rgb(127, 85, 1)',
    fontFamily: 'JosefinBold',
  },
});
