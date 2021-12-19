import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, Animated, Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useIsFocused } from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';

import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import { AlertContext } from '../context/alertContext/AlertContext';
import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { useForm } from '../hooks/useForm';
import { beer_ingredients, beer_types, specialities } from '../helpers/beerIngredients';
import { countries } from '../helpers/countries';
import CustomDropDownPicker from '../components/CustomDropDownPicker';
// DropDownPicker.setListMode("MODAL");
// DropDownPicker.setMode("BADGE");

const width = Dimensions.get('screen').width;

const initialState = {
  avb: '',
  short_description: '',
  description: '',
  first_brewed: '',
  name: '',
  city: '',
};

type NewBeerField =
  | 'avb'
  | 'short_description'
  | 'description'
  | 'first_brewed'
  | 'ingredients'
  | 'name'
  | 'city'
  | 'origin_country'

export const NewBeer = ({ ...props }: DrawerContentComponentProps) => {
  const {
    avb,
    short_description,
    description,
    first_brewed,
    name,
    city,
    onChange,
  } = useForm(initialState);

  const [openBeerType, setOpenBeerType] = useState(false);
  const [type, setType] = useState(null);

  const [openSpeciality, setOpenSpeciality] = useState(false);
  const [speciality, setSpeciality] = useState(null);

  const [openCountry, setOpenCountry] = useState(false);
  const [country, setCountry] = useState(null);

  const [openIngredients, setOpenIngredients] = useState(false);
  const [ingredients, setIngredients] = useState(null);

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

    if (avb) {

    }
    if (name) {

    }
    if (city) {

    }
    if (description) {

    }
  };

  const onChangeInput = (value: string, field: NewBeerField) => {
    const numericRegex = new RegExp(/^\d+(\.\d{1,2})?$/);

    console.log({ value, field })
    console.log(numericRegex.test(value))
    // if (field === 'avb' && numericRegex.test(value)) {
    //   onChange(value, field);
    // }


    onChange(value, field)



  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.mainContainer}
    >
      <DrawerToggleButton {...props} />

      <ScrollView style={{ paddingHorizontal: 15 }}>
        <View style={styles.containerHeader}>
          <Text style={styles.headerText}>
            Nueva Cerveza
          </Text>
        </View>

        {/* Beer Name input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            Nombre
          </Text>
          <TextInput
            style={styles.inputField}
            keyboardType="default"
            selectionColor="lightgrey"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            onChangeText={(value) => onChangeInput(value, 'name')}
            value={name}
            onSubmitEditing={onSubmitForm}
          />
          <View style={styles.iconOkContainer}>
            <Icon
              name="checkmark-outline"
              size={30}
              color="rgb(0, 160, 18)"
            />
          </View>
        </View>

        {/* Abv Name input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            Graduación Alcohol
          </Text>
          <TextInput
            style={styles.inputField}
            keyboardType="decimal-pad"
            selectionColor="lightgrey"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            onChangeText={(value) => onChangeInput(value, 'avb')}
            value={avb}
            onSubmitEditing={onSubmitForm}
          />
          <View style={styles.iconOkContainer}>
            <Icon
              name="checkmark-outline"
              size={30}
              color="rgb(0, 160, 18)"
            />
          </View>
        </View>

        {/* Beer Type picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            Tipo cerveza
          </Text>
          <CustomDropDownPicker
            open={openBeerType}
            value={type}
            items={beer_types}
            setOpen={setOpenBeerType}
            setValue={setType}
            placeholder=""
            modalTitle="Tipos de cerveza"
          />
        </View>

        {/* Beer Speciality picker */}
        <View style={{
          ...styles.inputContainer,
          backgroundColor: !type ? 'rgba(0,0,0,0.1)' : 'rgb(255, 255, 230)',
          elevation: !type ? 0 : 5,
        }}>
          <Text style={{
            ...styles.inputInfo,
            color: !type ? 'rgba(0,0,0,0.1)' : 'rgba(127, 85, 1, 0.5)',
          }}>
            Especialidad
          </Text>
          <CustomDropDownPicker
            disabled={!type}
            open={openSpeciality}
            value={speciality}
            items={type ? specialities[type] : []}
            setOpen={setOpenSpeciality}
            setValue={setSpeciality}
            placeholder=""
            modalTitle="Especialidades de cerveza"
          />
        </View>

        {/* Beer Origin Country picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            País de origen
          </Text>
          <CustomDropDownPicker
            open={openCountry}
            value={country}
            items={countries}
            setOpen={setOpenCountry}
            setValue={setCountry}
            placeholder=""
            mode="BADGE"
            modalTitle="Seleccionar país"
          />
        </View>

        {/* City Beer input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            Ciudad de origen
          </Text>
          <TextInput
            style={styles.inputField}
            keyboardType="default"
            selectionColor="lightgrey"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            onChangeText={(value) => onChangeInput(value, 'city')}
            value={city}
            onSubmitEditing={onSubmitForm}
          />
          <View style={styles.iconOkContainer}>
            <Icon
              name="checkmark-outline"
              size={30}
              color="rgb(0, 160, 18)"
            />
          </View>
        </View>

        {/* City Beer input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            Año de primera elaboración
          </Text>
          <TextInput
            style={styles.inputField}
            keyboardType="number-pad"
            selectionColor="lightgrey"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            onChangeText={(value) => onChangeInput(value, 'first_brewed')}
            value={first_brewed}
            onSubmitEditing={onSubmitForm}
          />
          <View style={styles.iconOkContainer}>
            <Icon
              name="checkmark-outline"
              size={30}
              color="rgb(0, 160, 18)"
            />
          </View>
        </View>

        {/* Ingredients Beer input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            Ingredientes
          </Text>
          <CustomDropDownPicker
            open={openIngredients}
            value={ingredients}
            items={beer_ingredients}
            setOpen={setOpenIngredients}
            setValue={setIngredients}
            placeholder=""
            multiple={true}
            min={1}
            mode="BADGE"
            modalTitle="Seleccionar ingredientes"
          />
        </View>

        {/* Short Description Beer input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            Descripción breve
          </Text>
          <TextInput
            style={{
              ...styles.inputField,
              maxHeight: 85,
            }}
            keyboardType="default"
            selectionColor="lightgrey"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            onChangeText={(value) => onChangeInput(value, 'short_description')}
            value={short_description}
            onSubmitEditing={onSubmitForm}
            multiline={true}
            numberOfLines={4}
          />
          <View
            style={{
              ...styles.iconOkContainer,
              top: 35,
            }}
          >
            <Icon
              name="checkmark-outline"
              size={30}
              color="rgb(0, 160, 18)"
            />
          </View>
        </View>

        {/* Description Beer input */}
        <View style={{
          ...styles.inputContainer,
          marginBottom: 100,
        }}>
          <Text style={styles.inputInfo}>
            Descripción detallada
          </Text>
          <TextInput
            style={{
              ...styles.inputField,
              maxHeight: 170,
            }}
            keyboardType="default"
            selectionColor="lightgrey"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            onChangeText={(value) => onChangeInput(value, 'description')}
            value={description}
            onSubmitEditing={onSubmitForm}
            multiline={true}
            numberOfLines={10}

          />
          <View
            style={{
              ...styles.iconOkContainer,
              top: 85,
            }}
          >
            <Icon
              name="checkmark-outline"
              size={30}
              color="rgb(0, 160, 18)"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(221, 204, 157, 0.3)',
  },
  containerHeader: {
    flexDirection: 'row',
    paddingVertical: 25,
  },
  headerText: {
    fontFamily: 'JosefinBold',
    fontSize: 25,
    color: 'rgba(104, 77, 0, 1)',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.05)',
    backgroundColor: 'rgb(255, 255, 230)',
    paddingHorizontal: 10,
    width: width - 30,
    marginBottom: 13,
    elevation: 5,
    zIndex: 0,
  },
  inputInfo: {
    fontFamily: 'JosefinBold',
    fontSize: 14,
    color: 'rgba(211, 157, 0, 0.4)',
  },
  inputField: {
    fontSize: 15,
    paddingVertical: 5,
    paddingLeft: 10,
    width: '100%',
    color: 'rgb(127, 85, 1)',
    fontFamily: 'JosefinBold',
  },
  iconOkContainer: {
    height: 28,
    width: 28,
    paddingLeft: 1,
    borderRadius: 20,
    position: 'absolute',
    right: 14,
    top: 13,
  }
});
