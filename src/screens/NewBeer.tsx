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
import { beer_types } from '../helpers/beerIngredients';
import { countries } from '../helpers/countries';
// DropDownPicker.setListMode("MODAL");
// DropDownPicker.setMode("BADGE");

const width = Dimensions.get('screen').width;

const initialState = {
  avb: '',
  short_description: '',
  description: '',
  first_brewed: '',
  ingredients: '',
  name: '',
  city: '',
  origin_country: '',
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
    ingredients,
    name,
    city,
    origin_country,
    onChange
  } = useForm(initialState);
  const [openBeerType, setOpenBeerType] = useState(false);
  const [type, setType] = useState(null);

  const [openCountry, setOpenCountry] = useState(false);
  const [country, setCountry] = useState(null);

  // const [openCountry, setOpenCountry] = useState(false);
  // const [country, setCountry] = useState(null);

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
              size={24}
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
              size={24}
              color="rgb(0, 160, 18)"
            />
          </View>
        </View>

        {/* Beer Type Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            Tipo cerveza
          </Text>
          <DropDownPicker
            listMode="MODAL"
            open={openBeerType}
            value={type}
            items={beer_types}
            setOpen={setOpenBeerType}
            setValue={setType}
            placeholder="Seleccionar tipo"
            // setItems={setItems}
            dropDownDirection="TOP"
            zIndex={2}
            zIndexInverse={1}
            style={{
              borderWidth: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0,0,0,0)',
              height: 40,
            }}
            ArrowDownIconComponent={({ style }) => (
              <Icon name="chevron-down-outline" size={25} color="rgba(127, 85, 1, 0.5)" style={style} />
            )}
            ArrowUpIconComponent={({ style }) => (
              <Icon name="chevron-up-outline" size={25} color="rgba(127, 85, 1, 0.5)" style={style} />
            )}
            CloseIconComponent={({ style }) => (
              <Icon name="close-outline" size={45} color="rgb(186, 1, 1)" style={style} />
            )}
            TickIconComponent={({ style }) => (
              <Icon name="checkmark-outline" size={27} color="rgb(13, 196, 0)" style={style} />
            )}
            arrowIconStyle={{
              width: 20,
              height: 20,
              marginBottom: 20,
            }}
            tickIconStyle={{
              width: 30,
              height: 30,
            }}
            closeIconStyle={{
              width: 40,
              height: 40
            }}
            labelStyle={{
              fontFamily: 'JosefinBold',
              fontSize: 15,
              color: 'rgb(127, 85, 1)',
            }}
            modalProps={{
              animationType: "slide"
            }}
            modalContentContainerStyle={{
              backgroundColor: 'rgba(255,255,255,1)',
            }}
            modalTitle="Seleccionar tipo"
            modalTitleStyle={{
              fontFamily: 'JosefinBold',
              color: 'rgba(0,0,0,0.8)',
              fontSize: 20,
            }}
            listItemLabelStyle={{
              fontFamily: 'JosefinBold',
              color: 'rgba(0,0,0,0.4)',
              fontSize: 18,
            }}
            placeholderStyle={{
              fontSize: 15,
              paddingVertical: 5,
              width: '100%',
              color: 'rgba(127, 85, 1, 0.3)',
              fontFamily: 'JosefinBold',
            }}
          />
          {/* <View style={styles.iconOkContainer}>
            <Icon
              name="checkmark-outline"
              size={24}
              color="rgb(0, 160, 18)"
            />
          </View> */}
        </View>

        {/* Beer Origin Country input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            País de origen
          </Text>
          <DropDownPicker
            listMode="MODAL"
            open={openCountry}
            value={country}
            items={countries}
            setOpen={setOpenCountry}
            setValue={setCountry}
            placeholder="Seleccionar tipo"
            // setItems={setItems}
            dropDownDirection="TOP"
            zIndex={2}
            zIndexInverse={1}
            style={{
              borderWidth: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0,0,0,0)',
              height: 40,
            }}
            ArrowDownIconComponent={({ style }) => (
              <Icon name="chevron-down-outline" size={25} color="rgba(127, 85, 1, 0.5)" style={style} />
            )}
            ArrowUpIconComponent={({ style }) => (
              <Icon name="chevron-up-outline" size={25} color="rgba(127, 85, 1, 0.5)" style={style} />
            )}
            CloseIconComponent={({ style }) => (
              <Icon name="close-outline" size={45} color="rgb(186, 1, 1)" style={style} />
            )}
            TickIconComponent={({ style }) => (
              <Icon name="checkmark-outline" size={27} color="rgb(13, 196, 0)" style={style} />
            )}
            arrowIconStyle={{
              width: 20,
              height: 20,
              marginBottom: 20,
            }}
            tickIconStyle={{
              width: 30,
              height: 30,
            }}
            closeIconStyle={{
              width: 40,
              height: 40
            }}
            labelStyle={{
              fontFamily: 'JosefinBold',
              fontSize: 15,
              color: 'rgb(127, 85, 1)',
            }}
            modalProps={{
              animationType: "slide"
            }}
            modalContentContainerStyle={{
              backgroundColor: 'rgba(255,255,255,1)',
            }}
            modalTitle="Seleccionar país"
            modalTitleStyle={{
              fontFamily: 'JosefinBold',
              color: 'rgba(0,0,0,0.8)',
              fontSize: 20,
            }}
            listItemLabelStyle={{
              fontFamily: 'JosefinBold',
              color: 'rgba(0,0,0,0.4)',
              fontSize: 18,
            }}
            placeholderStyle={{
              fontSize: 15,
              paddingVertical: 5,
              width: '100%',
              color: 'rgba(127, 85, 1, 0.3)',
              fontFamily: 'JosefinBold',
            }}
          // renderListItem={({ item, onPress }) =>
          //   <TouchableOpacity onPress={(value) => { console.log(value) }}>
          //     <Text>{item.flag}</Text>
          //   </TouchableOpacity>
          // }
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
              size={24}
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
              size={24}
              color="rgb(0, 160, 18)"
            />
          </View>
        </View>

        {/* Ingredients Beer input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            Ingredientes
          </Text>
          <TextInput
            style={styles.inputField}
            keyboardType="default"
            selectionColor="lightgrey"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="off"
            onChangeText={(value) => onChangeInput(value, 'ingredients')}
            value={ingredients}
            onSubmitEditing={onSubmitForm}
          />
          <View style={styles.iconOkContainer}>
            <Icon
              name="checkmark-outline"
              size={24}
              color="rgb(0, 160, 18)"
            />
          </View>
        </View>


        {/* Short Description Beer input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputInfo}>
            Descripción breve
          </Text>
          <TextInput
            style={styles.inputField}
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
              size={24}
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
            style={styles.inputField}
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
              top: 35,
            }}
          >
            <Icon
              name="checkmark-outline"
              size={24}
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
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(221, 204, 157, 1)',
    paddingHorizontal: 10,
    width: width - 30,
    marginBottom: 10,
    elevation: 5,
    zIndex: 0,
  },
  inputInfo: {
    fontFamily: 'JosefinBold',
    fontSize: 14,
    color: 'rgba(127, 85, 1, 0.5)',
  },
  inputField: {
    fontSize: 15,
    paddingVertical: 5,
    width: '100%',
    color: 'rgb(127, 85, 1)',
    fontFamily: 'JosefinBold',
  },
  iconOkContainer: {
    height: 28,
    width: 28,
    paddingLeft: 1,
    backgroundColor: 'rgb(204, 255, 178)',
    borderRadius: 20,
    position: 'absolute',
    right: 14,
    top: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    elevation: 5,
  }
});
