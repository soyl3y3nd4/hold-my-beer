import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity, ScrollView, StyleSheet, Text, TextInput, View, ImageBackground, useWindowDimensions, Image } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useIsFocused } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import { AlertContext } from '../context/alertContext/AlertContext';
import { BeerContext } from '../context/beerContext/BeerContext';

import { useForm } from '../hooks/useForm';

import { DrawerToggleButton } from '../components/DrawerToggleButton';
import { beer_ingredients, beer_types, specialities } from '../helpers/beerIngredients';
import { countries } from '../helpers/countries';
import CustomDropDownPicker from '../components/CustomDropDownPicker';
import { beerYears } from '../helpers/years';
import { LoadingScreen } from './LoadingScreen';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ModalMediaZone } from '../components/ModalMediaZone';
import { ModalRedirect } from '../components/ModalRedirect';
import { waitFor } from '../helpers/helpers';

const initialState = {
  abv: '',
  description: '',
  first_brewed: '',
  name: '',
  city: '',
};

export const NewBeerScreen = ({ ...props }: DrawerContentComponentProps) => {
  const {
    abv,
    description,
    name,
    city,
    onChange,
    setFormValue,
  } = useForm(initialState);
  const { height, width } = useWindowDimensions();

  const { navigation } = props;

  const [openBeerType, setOpenBeerType] = useState(false);
  const [type, setType] = useState<null | string>(null);

  const [openSpeciality, setOpenSpeciality] = useState(false);
  const [speciality, setSpeciality] = useState<null | string>(null);

  const [openCountry, setOpenCountry] = useState(false);
  const [origin_country, setOrigin_country] = useState<null | string>(null);

  const [openIngredients, setOpenIngredients] = useState(false);
  const [ingredients, setIngredients] = useState<null | string>(null);

  const [openYears, setOpenYears] = useState(false);
  const [first_brewed, setFirst_brewed] = useState<null | string>(null);

  const { showAlert } = useContext(AlertContext);
  const { beers, getBeers, uploadBeer, isLoading, setIsLoading, uploadImageBeer } = useContext(BeerContext);

  const [tempUri, setTempUri] = useState<string | null>(null);
  const [tempFile, setTempFile] = useState<Asset | null>(null);
  const [modalMediaZoneIsOpen, setModalMediaZoneIsOpen] = useState(false);

  const [modalRedirectIsOpen, setModalRedirectIsOpen] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) return;
    resetForm();
  }, [isFocused]);

  useEffect(() => {
    if (beers.length > 0) return;
    getBeers();
  }, []);

  const saveBeer = async () => {
    setIsLoading(true);

    const beer = {
      description,
      abv,
      ingredients,
      first_brewed,
      image_url: '',
      name,
      type,
      speciality,
      origin_country,
      city,
      votes: 0,
      ratings: [],
      creation_date: new Date().toISOString(),
    };

    if (tempFile) {
      const imageUrl = await uploadImageBeer(tempFile);
      beer.image_url = imageUrl;
    }

    /* @ts-ignore */
    const resp = await uploadBeer(beer);

    if (!resp) {
      onChange('', 'name');
      setIsLoading(false);
      return showAlert({
        isOpen: true,
        buttonText: 'CERRAR',
        message: `Error, esta cerveza ya existe!\nPrueba con otro nombre`,
      });
    } else {
      setIsLoading(false);
      resetForm();

      setModalRedirectIsOpen(true);
    }
  };

  const redirectToTab1 = async () => {
    setModalRedirectIsOpen(false);
    await waitFor(300);

    navigation.navigate('Tab1');
  };

  const onSubmitForm = () => {
    const numericRegex = new RegExp(/^\d+(\.\d{1,2})?$/);

    let isValid = true;
    let message = '';

    checkIfBeerExists();
    if (checkIfBeerExists()) {
      isValid = false;
      message += `Ya existe una cerveza con ese nombre.\n`;
    }

    if (!name || name.length === 0) {
      isValid = false;
      message += `Debes introducir un nombre.\n`;
    }

    if (!abv || abv.length === 0 || !numericRegex.test(abv) || Number(abv) > 67 || Number(abv) < 0) {
      isValid = false;
      message += `Debes de introducir una graduación válida.\n`;
    }

    if (!type || type.length === 0) {
      isValid = false;
      message += `Debes de especificar un tipo.\n`;
    }
    if (!speciality || speciality.length === 0) {
      isValid = false;
      message += `Debes de especificar una especialidad.\n`;
    }

    if (!origin_country || origin_country.length === 0) {
      isValid = false;
      message += `Debes especificar un país.\n`;
    }

    if (!city || city.length === 0) {
      isValid = false;
      message += `Debes introducir una ciudad.\n`;
    }

    if (!first_brewed || first_brewed.length === 0) {
      isValid = false;
      message += `Debes especificar un año.\n`;
    }

    if (!ingredients || ingredients.length === 0) {
      isValid = false;
      message += `La ciudad no es válida.\n`;
    }

    if (isValid) {
      saveBeer();
    } else {
      return showAlert({
        isOpen: true,
        buttonText: 'CERRAR',
        message,
      });
    }
  };

  const checkIfBeerExists = (): boolean => {
    let beerNameExists = false;

    beers.map((beer) => {
      const beerWithoutAccents = beer.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const newBeerWithoutAccents = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (beerWithoutAccents === newBeerWithoutAccents) {
        beerNameExists = true;
        return;
      }
    });

    return beerNameExists;
  };

  const resetForm = () => {
    setType(null);
    setSpeciality(null);
    setOrigin_country(null);
    setIngredients(null);
    setFirst_brewed(null);
    setTempUri(null)
    setTempFile(null);
    setFormValue(initialState);
  };

  const takePhoto = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5
    }, async (resp) => {
      if (resp.didCancel) return;
      if (!resp?.assets![0]?.uri) return;
      setTempUri(resp.assets[0].uri);
      setTempFile(resp.assets[0]);

      setModalMediaZoneIsOpen(false);
    });
  };

  const takePhotoFromLibrary = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5
    }, async (resp) => {
      if (resp.didCancel) return;
      if (!resp?.assets![0]?.uri) return;

      setTempUri(resp.assets[0].uri);
      setTempFile(resp.assets[0]);

      setModalMediaZoneIsOpen(false);
    });
  };

  return (
    <>
      <ImageBackground
        style={{ height, width, flex: 1, }}
        source={require('../images/add_beer.jpg')}
        resizeMode="cover"
      >

        <ScrollView style={{ backgroundColor: 'rgba(221, 204, 157, 0.2)' }}>
          <View style={{ paddingHorizontal: 15, flex: 1, width: '100%' }}>

            <View style={styles.containerHeader}>
              <Text style={styles.headerText}>
                Nueva Cerveza
              </Text>
            </View>

            <TouchableOpacity
              style={{
                ...styles.mediaZone,
                width: width > 500 ? width * 0.615 : width - 30
              }}
              activeOpacity={0.7}
              onPress={() => setModalMediaZoneIsOpen(true)}
            >
              {
                tempUri
                  ? (
                    <ImageBackground
                      source={{ uri: tempUri }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  )
                  : (
                    <View style={styles.mediaZoneNested}>
                      <Icon name="camera-outline" size={30} color="rgba(211, 157, 0, 0.6)" />
                      <Text style={styles.mediaZoneText}>Agregar Imagen</Text>
                    </View>
                  )
              }
            </TouchableOpacity>

            <ModalMediaZone
              takePhoto={takePhoto}
              takePhotoFromLibrary={takePhotoFromLibrary}
              isOpen={modalMediaZoneIsOpen}
              close={() => setModalMediaZoneIsOpen(false)}
            />

            <ModalRedirect
              buttonText="ACEPTAR"
              isOpen={modalRedirectIsOpen}
              close={redirectToTab1}
              message="Cerveza agregada con éxito, gracias!"
            />

            {/* Beer Name input */}
            <View style={{ ...styles.inputContainer, width: width > 500 ? width * 0.615 : width - 30 }}>
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

            </View>

            {/* Abv Name input */}
            <View style={{ ...styles.inputContainer, width: width > 500 ? width * 0.615 : width - 30, }}>
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
                onChangeText={(value) => onChange(value, 'abv')}
                value={abv}
              />
            </View>

            {/* Beer Type picker */}
            <View style={{ ...styles.inputContainer, width: width > 500 ? width * 0.615 : width - 30, }}>
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
              width: width > 500 ? width * 0.615 : width - 30,
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
                // @ts-ignore
                items={type ? specialities[type] : []}
                setOpen={setOpenSpeciality}
                setValue={setSpeciality}
                placeholder=""
                modalTitle="Especialidades de cerveza"
              />
            </View>

            {/* Beer Origin Country picker */}
            <View style={{ ...styles.inputContainer, width: width > 500 ? width * 0.615 : width - 30, }}>
              <Text style={styles.inputInfo}>
                País de origen
              </Text>
              <MaterialCommunityIcons style={styles.iconInput} name="earth" />
              <CustomDropDownPicker
                open={openCountry}
                value={origin_country}
                items={countries}
                setOpen={setOpenCountry}
                setValue={setOrigin_country}
                placeholder=""
                mode="BADGE"
                modalTitle="Seleccionar país"
              />
            </View>

            {/* City Beer input */}
            <View style={{ ...styles.inputContainer, width: width > 500 ? width * 0.615 : width - 30, }}>
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
            </View>

            {/* City Beer input */}
            <View style={{ ...styles.inputContainer, width: width > 500 ? width * 0.615 : width - 30, }}>
              <Text style={styles.inputInfo}>
                Año de primera elaboración
              </Text>
              <MaterialCommunityIcons style={styles.iconInput} name="calendar-range" />
              <CustomDropDownPicker
                open={openYears}
                value={first_brewed}
                items={beerYears}
                setOpen={setOpenYears}
                setValue={setFirst_brewed}
                placeholder=""
                modalTitle="Año de primera elaboración"
              />
            </View>

            {/* Ingredients Beer input */}
            <View style={{ ...styles.inputContainer, width: width > 500 ? width * 0.615 : width - 30, }}>
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

            {/* Description Beer input */}
            <View style={{
              ...styles.inputContainer,
              marginBottom: 40,
              width: width > 500 ? width * 0.615 : width - 30,
            }}>
              <Text style={styles.inputInfo}>
                Descripción
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
                numberOfLines={6}

              />
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              style={styles.cancelForm}
            >
              <Text style={styles.buttonsText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onSubmitForm}
              style={styles.submitForm}
            >
              <Text style={styles.buttonsText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {isLoading
          ? <LoadingScreen />
          : <DrawerToggleButton {...props} />
        }
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
  mediaZone: {
    borderWidth: 1,
    height: 100,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.05)',
    elevation: 3,
    backgroundColor: 'rgba(255, 255, 230, 0.9)',
    marginBottom: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaZoneNested: {
    borderWidth: 1,
    width: '95%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 5,
  },
  mediaZoneText: {
    fontFamily: 'JosefinBold',
    fontSize: 14,
    color: 'rgba(211, 157, 0, 0.6)',
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
  iconFeedbackContainer: {
    height: 28,
    width: 28,
    paddingLeft: 1,
    borderRadius: 20,
    position: 'absolute',
    right: 14,
    top: 15,
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
  cancelForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
    borderColor: 'rgba(255, 175, 0, 0.8)',
    borderRadius: 5,
    height: 40,
    padding: 3,
    marginBottom: 40,
    width: 100,
  },
  submitForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    backgroundColor: 'rgba(255, 175, 0, 0.8)',
    borderRadius: 5,
    height: 40,
    padding: 3,
    marginBottom: 40,
    width: 100,
  },
  buttonsText: {
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});