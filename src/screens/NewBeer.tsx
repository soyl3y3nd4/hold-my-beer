import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, ScrollView, StyleSheet, Text, TextInput, View, ImageBackground, useWindowDimensions } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import firestore from '@react-native-firebase/firestore';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AlertContext } from '../context/alertContext/AlertContext';
import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { useForm } from '../hooks/useForm';
import { beer_ingredients, beer_types, specialities } from '../helpers/beerIngredients';
import { countries } from '../helpers/countries';
import CustomDropDownPicker from '../components/CustomDropDownPicker';
import { beerYears } from '../helpers/years';
import { useBeer } from '../hooks/useBeer';
import { useIsFocused } from '@react-navigation/native';

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
    name,
    city,
    onChange,
    setFormValue
  } = useForm(initialState);
  const { height, width } = useWindowDimensions();

  const [openBeerType, setOpenBeerType] = useState(false);
  const [type, setType] = useState(null);

  const [openSpeciality, setOpenSpeciality] = useState(false);
  const [speciality, setSpeciality] = useState(null);

  const [openCountry, setOpenCountry] = useState(false);
  const [country, setCountry] = useState(null);

  const [openIngredients, setOpenIngredients] = useState(false);
  const [ingredients, setIngredients] = useState(null);

  const [openYears, setOpenYears] = useState(false);
  const [years, setYears] = useState(null);

  const { showAlert } = useContext(AlertContext);
  const { beers } = useBeer();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) return;
    resetForm();
  }, [isFocused]);

  const saveBeer = async () => {
    console.log('GUARDAR BIRRA')
    const ref = await firestore().collection('beers');
    const beer = await ref.doc(name).get();

    if (beer.data()) {
      return showAlert({
        isOpen: true,
        buttonText: 'CERRAR',
        message: 'Error, esta cerveza ya existe!',
      });
    } else {
      ref.doc(name).set({
        description,
        abv: avb,
        ingredients,
        first_brewed: years,
        image_url: '',
        name,
        short_description,
        type,
        speciality,
        origin_country: country,
        city,
        votes: 0,
      });
      console.log('BIRRA GAURADISIMA')
      resetForm();
      return showAlert({
        isOpen: true,
        buttonText: 'CERRAR',
        message: 'Cerveza agregada!',
      });
    }
  };

  const onSubmitForm = () => {
    console.log({
      avb,
      short_description,
      description,
      name,
      city,
      type,
      speciality,
      country,
      ingredients,
      years,
    });
    let isValid = true;

    if (checkIfBeerExists()) {
      console.log('Ya existe', name);
      isValid = false;
    }

    if (!name || name.length === 0) {
      isValid = false;
    }
    if (!avb || avb.length === 0) {
      isValid = false;
    }
    if (!type || type.length === 0) {
      isValid = false;
    }
    if (!speciality || speciality.length === 0) {
      isValid = false;
    }
    if (!country || country.length === 0) {
      isValid = false;
    }
    if (!city || city.length === 0) {
      isValid = false;
    }
    if (!years || years.length === 0) {
      isValid = false;
    }
    if (!ingredients || ingredients.length === 0) {
      isValid = false;
    }

    if (isValid) {
      saveBeer();
    } else {
      console.log('NO VALKID')
    }
  };

  // const onChange2 = (value: string, field: NewBeerField) => {
  //   const numericRegex = new RegExp(/^\d+(\.\d{1,2})?$/);

  //   // console.log({ value, field })
  //   // console.log(numericRegex.test(value))
  //   if (field === 'avb' && numericRegex.test(value)) {
  //     onChange(value, field);
  //   }


  //   onChange(value, field)



  // };

  const checkIfBeerExists = (): boolean => {
    let beerNameExists = false;

    beers.map((beer) => {
      const beerWithoutAccents = beer.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const newBeerWithoutAccents = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      if (beerWithoutAccents === newBeerWithoutAccents) {
        beerNameExists = true;
      }
    });

    return beerNameExists;
  };

  const resetForm = () => {
    setType(null);
    setSpeciality(null);
    setCountry(null);
    setIngredients(null);
    setYears(null);
    setFormValue(initialState);
  };

  return (
    <>
      <ImageBackground style={{ height, width, alignItems: 'center', flex: 1, }} source={require('../images/add_beer.jpg')} resizeMode="cover">
        <DrawerToggleButton {...props} />

        <TouchableOpacity
          activeOpacity={0.2}
          onPress={onSubmitForm}
          style={styles.submit}
        >
          <MaterialCommunityIcons size={35} color="rgb(0, 255, 25)" style={{ top: -4, }} name="check" />
        </TouchableOpacity>

        <ScrollView style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
          <View style={{ paddingHorizontal: 15, flex: 1, width: '100%', backgroundColor: 'rgba(221, 204, 157, 0.2)' }}>

            <View style={styles.containerHeader}>
              <Text style={styles.headerText}>
                Nueva Cerveza
              </Text>
            </View>

            {/* Beer Name input */}
            <View style={{ ...styles.inputContainer, width: width - 30, }}>
              <Text style={styles.inputInfo}>
                Nombre
              </Text>
              <MaterialCommunityIcons style={styles.iconInput} name="tag-text-outline" />
              <TextInput
                style={styles.inputField}
                keyboardType="default"
                selectionColor="lightgrey"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="off"
                onChangeText={(value) => onChange(value, 'name')}
                value={name}
              />
              {/* <View style={styles.iconOkContainer}>
                <Icon
                  name="checkmark-outline"
                  
                  color="rgb(0, 160, 18)"
                />
              </View> */}
            </View>

            {/* Abv Name input */}
            <View style={{ ...styles.inputContainer, width: width - 30, }}>
              <Text style={styles.inputInfo}>
                Graduación Alcohol
              </Text>
              <MaterialCommunityIcons style={styles.iconInput} name="percent-outline" />
              <TextInput
                style={styles.inputField}
                keyboardType="decimal-pad"
                selectionColor="lightgrey"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="off"
                onChangeText={(value) => onChange(value, 'avb')}
                value={avb}
              />
              {/* <View style={styles.iconOkContainer}>
                <Icon
                  name="checkmark-outline"
                  
                  color="rgb(0, 160, 18)"
                />
              </View> */}
            </View>

            {/* Beer Type picker */}
            <View style={{ ...styles.inputContainer, width: width - 30, }}>
              <Text style={styles.inputInfo}>
                Tipo cerveza
              </Text>
              <MaterialCommunityIcons style={styles.iconInput} name="glass-mug-variant" />
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
              width: width - 30,
              backgroundColor: !type ? 'rgba(255,255,255,0.2)' : 'rgba(255, 255, 230, 0.9)',
              elevation: !type ? 0 : 5,
            }}>
              <Text style={{
                ...styles.inputInfo,
                color: !type ? 'rgba(0,0,0,0.3)' : 'rgba(211, 157, 0, 0.4)',
              }}>
                Especialidad
              </Text>
              <MaterialCommunityIcons style={styles.iconInput} name="folder-star-outline" />
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
            <View style={{ ...styles.inputContainer, width: width - 30, }}>
              <Text style={styles.inputInfo}>
                País de origen
              </Text>
              <MaterialCommunityIcons style={styles.iconInput} name="earth" />
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
            <View style={{ ...styles.inputContainer, width: width - 30, }}>
              <Text style={styles.inputInfo}>
                Ciudad de origen
              </Text>
              <MaterialCommunityIcons style={styles.iconInput} name="city-variant-outline" />
              <TextInput
                style={styles.inputField}
                keyboardType="default"
                selectionColor="lightgrey"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="off"
                onChangeText={(value) => onChange(value, 'city')}
                value={city}
              />
              {/* <View style={styles.iconOkContainer}>
                <Icon
                  name="checkmark-outline"
                  
                  color="rgb(0, 160, 18)"
                />
              </View> */}
            </View>

            {/* City Beer input */}
            <View style={{ ...styles.inputContainer, width: width - 30, }}>
              <Text style={styles.inputInfo}>
                Año de primera elaboración
              </Text>
              <MaterialCommunityIcons style={styles.iconInput} name="calendar-range" />
              <CustomDropDownPicker
                open={openYears}
                value={years}
                items={beerYears}
                setOpen={setOpenYears}
                setValue={setYears}
                placeholder=""
                modalTitle="Año de primera elaboración"
              />

              {/* <View style={styles.iconOkContainer}>
                <Icon
                  name="checkmark-outline"
                  
                  color="rgb(0, 160, 18)"
                />
              </View> */}
            </View>

            {/* Ingredients Beer input */}
            <View style={{ ...styles.inputContainer, width: width - 30, }}>
              <Text style={styles.inputInfo}>
                Ingredientes
              </Text>
              <MaterialCommunityIcons style={styles.iconInput} name="food-apple-outline" />
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
            <View style={{ ...styles.inputContainer, width: width - 30, }}>
              <Text style={styles.inputInfo}>
                Descripción breve
              </Text>
              <MaterialCommunityIcons style={styles.iconInput} name="text-short" />
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
                onChangeText={(value) => onChange(value, 'short_description')}
                value={short_description}
                multiline={true}

                numberOfLines={4}
              />
              {/* <View
                style={{
                  ...styles.iconOkContainer,
                  top: 35,
                }}
              >
                <Icon
                  name="checkmark-outline"
                  
                  color="rgb(0, 160, 18)"
                />
              </View> */}
            </View>

            {/* Description Beer input */}
            <View style={{
              ...styles.inputContainer,
              marginBottom: 40,
            }}>
              <Text style={styles.inputInfo}>
                Descripción detallada
              </Text>
              <MaterialCommunityIcons style={styles.iconInput} name="text" />
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
                onChangeText={(value) => onChange(value, 'description')}
                value={description}
                multiline={true}
                numberOfLines={8}

              />
              {/* <View
                style={{
                  ...styles.iconOkContainer,
                  top: 85,
                }}
              >
                <Icon
                  name="checkmark-outline"
                  
                  color="rgb(0, 160, 18)"
                />
              </View> */}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontFamily: 'JosefinBold',
    fontSize: 20,
    color: 'rgba(255, 255, 255, 1)',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.05)',
    backgroundColor: 'rgba(255, 255, 230, 0.9)',
    paddingHorizontal: 10,
    paddingLeft: 35,
    marginBottom: 13,
    elevation: 3,
    shadowColor: 'rgba(0,0,0,0.6)',
    zIndex: 0,
  },
  iconInput: {
    position: 'absolute',
    left: 14,
    top: 28,
    fontSize: 20,
    color: 'rgba(0,0,0,0.2)'
  },
  inputInfo: {
    fontFamily: 'JosefinBold',
    fontSize: 14,
    left: -20,
    color: 'rgba(211, 157, 0, 0.6)',
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
  },
  buttonContainer: {
    alignItems: 'center',
    top: 50,
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0, 0.02)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    top: -1
  },
  submit: {
    position: 'absolute',
    top: 26,
    left: 15,
    zIndex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    height: 34,
    padding: 3,
  }
});
