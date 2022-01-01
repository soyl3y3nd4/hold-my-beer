import React, { useContext, useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Animated from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../context/authContext/AuthContext';
import { useForm } from '../hooks/useForm';
import { loginTheme } from '../theme/loginTheme';

import { HomeScreenProp } from '../interfaces/Navigation';
import { AlertContext } from '../context/alertContext/AlertContext';
import { LoadingScreen } from './LoadingScreen';
import { useAnimatedBorder } from '../hooks/userAnimatedBorder';
import { calculate_age } from '../helpers/helpers';
import { KeyboardContext } from '../context/keyboardContext/KeyboardContext';

const initialFormValues = {
  email: '',
  name: '',
  surname: '',
  password: '',
  password2: '',
};

export const RegisterScreen = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const { width } = useWindowDimensions();

  const { signUp, isLoading, setIsLoading } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const { boxAnimationRegisterText } = useContext(KeyboardContext);

  const {
    onChange,
    password,
    email,
    password2,
    setFormValue,
    name,
    surname,
  } = useForm(initialFormValues);
  const [date, setDate] = useState(new Date(1));

  const [show, setShow] = useState(false);

  const { rStyle, setUserColor } = useAnimatedBorder();
  const { rStyle: rStyle2, setUserColor: setUserColor2 } = useAnimatedBorder();
  const { rStyle: rStyle3, setUserColor: setUserColor3 } = useAnimatedBorder();
  const { rStyle: rStyle4, setUserColor: setUserColor4 } = useAnimatedBorder();
  const { rStyle: rStyle5, setUserColor: setUserColor5 } = useAnimatedBorder();
  const { rStyle: rStyle6, setUserColor: setUserColor6 } = useAnimatedBorder();

  const onRegister = async () => {
    setIsLoading(true);
    const resp = await signUp({ email, password });
    setIsLoading((loading) => !loading);

    if (resp.status === 'ok') {
      handleRegisterSuccess();
      const ref = await firestore().collection('users');
      const user = await ref.doc(email).get();
      if (!user.data()) {
        ref.doc(email).set({
          email,
          name,
          surname,
          birth_date: date.toLocaleDateString()
        });
      }
    } else {
      showAlert({
        isOpen: true,
        buttonText: 'CERRAR',
        message: resp.message,
      });
    }
  };

  const handleRegisterSuccess = () => {
    showAlert({
      isOpen: true,
      buttonText: 'ACEPTAR',
      message: 'Bienvenido! \nComprueba tu email para confirmar el registro, revisa también tu carpeta de spam.',
    });
    setFormValue(initialFormValues);

    setTimeout(() => {
      navigation.navigate('LoginScreen')
    }, 300);
  };

  const onSubmitForm = () => {
    if (email.length === 0 || password.length === 0) {
      return showAlert({
        isOpen: true,
        buttonText: 'CERRAR',
        message: 'El email y contraseña son obligatorios',
      });
    }
    if (name.length < 3 || surname.length < 3) {
      return showAlert({
        isOpen: true,
        buttonText: 'CERRAR',
        message: 'El nombre y apellido son obligatorios',
      });
    }
    if (calculate_age(date) < 18 || date.getTime() === 1) {
      return showAlert({
        isOpen: true,
        buttonText: 'CERRAR',
        message: 'Debes de ser mayor de 18 años',
      });
    }
    if (password.length !== password2.length || password !== password2) {
      return showAlert({
        isOpen: true,
        buttonText: 'CERRAR',
        message: 'Las contraseñas no coinciden',
      });
    }
    onRegister();
  };

  const onDateChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    if (date.getTime() === 1) {
      setDate(new Date())
    }
    setUserColor6('rgba(255, 255, 255, 0.75)');
    setShow(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ImageBackground
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: Dimensions.get("window").width, //for full screen
          height: Dimensions.get("window").height //for full screen
        }}
        source={require('../images/toast1.jpg')}
        resizeMode="cover"
      />
      <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}>
        <Image
          style={{ width: 245, height: 90, marginTop: 20, top: 10 }}
          source={require('../images/holdmybeer2.png')}
        />

        {
          !isLoading
            ? (
              <>
                <View style={{
                  ...loginTheme.loginForm,
                  width: width * 0.8,
                }}>

                  {/* Input Email */}
                  <Animated.View style={[loginTheme.inputContainer, rStyle]}>
                    <Icon name="person-outline" size={20} color="rgba(255, 255, 255, 0.3)" />
                    <TextInput
                      style={loginTheme.inputField}
                      placeholder="Email"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      keyboardType="email-address"
                      selectionColor="lightgrey"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoCompleteType="off"
                      onChangeText={(value) => onChange(value, 'email')}
                      onFocus={() => setUserColor('rgba(255, 255, 255, 0.75)')}
                      onBlur={() => setUserColor('rgba(255, 255, 255, 0.3)')}
                      value={email}
                      onSubmitEditing={onSubmitForm}
                    />
                  </Animated.View>

                  {/* Input Name */}
                  <Animated.View style={[loginTheme.inputContainer, rStyle4]}>
                    <Icon name="document-text-outline" size={20} color="rgba(255, 255, 255, 0.3)" />
                    <TextInput
                      style={loginTheme.inputField}
                      placeholder="Nombre"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      keyboardType="default"
                      selectionColor="lightgrey"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoCompleteType="off"
                      onChangeText={(value) => onChange(value, 'name')}
                      onFocus={() => setUserColor4('rgba(255, 255, 255, 0.75)')}
                      onBlur={() => setUserColor4('rgba(255, 255, 255, 0.3)')}
                      value={name}
                      onSubmitEditing={onSubmitForm}
                    />
                  </Animated.View>

                  {/* Input Surname */}
                  <Animated.View style={[loginTheme.inputContainer, rStyle5]}>
                    <Icon name="document-text-outline" size={20} color="rgba(255, 255, 255, 0.3)" />
                    <TextInput
                      style={loginTheme.inputField}
                      placeholder="Apellido"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      keyboardType="default"
                      selectionColor="lightgrey"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoCompleteType="off"
                      onChangeText={(value) => onChange(value, 'surname')}
                      onFocus={() => setUserColor5('rgba(255, 255, 255, 0.75)')}
                      onBlur={() => setUserColor5('rgba(255, 255, 255, 0.3)')}
                      value={surname}
                      onSubmitEditing={onSubmitForm}
                    />
                  </Animated.View>

                  {/* Datepicker */}
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onDateChange}
                    />
                  )}
                  {/* Input Date */}
                  <Animated.View style={[loginTheme.inputContainer, rStyle6]}>
                    <Icon name="calendar-outline" size={20} color="rgba(255, 255, 255, 0.3)" />
                    <TextInput
                      style={loginTheme.inputField}
                      placeholder="Fecha nacimiento"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      keyboardType="default"
                      selectionColor="lightgrey"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoCompleteType="off"
                      onFocus={showDatepicker}
                      onBlur={() => setUserColor6('rgba(255, 255, 255, 0.3)')}
                      value={date.getTime() === 1 ? '' : date.toLocaleDateString()}
                      onSubmitEditing={onSubmitForm}
                    />
                  </Animated.View>

                  {/* Input Password */}
                  <Animated.View style={[loginTheme.inputContainer, rStyle2]}>
                    <Icon name="lock-closed-outline" size={20} color="rgba(255,255,255,0.5)" />
                    <TextInput
                      style={loginTheme.inputField}
                      secureTextEntry
                      placeholder="Contraseña"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      selectionColor="lightgrey"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoCompleteType="off"
                      onChangeText={(value) => onChange(value, 'password')}
                      onFocus={() => setUserColor2('rgba(255, 255, 255, 0.75)')}
                      onBlur={() => setUserColor2('rgba(255, 255, 255, 0.3)')}
                      value={password}
                      onSubmitEditing={onSubmitForm}
                    />
                  </Animated.View>

                  {/* Input Password 2*/}
                  <Animated.View style={[loginTheme.inputContainer, rStyle3]}>
                    <Icon name="lock-closed-outline" size={20} color="rgba(255,255,255,0.5)" />
                    <TextInput
                      style={loginTheme.inputField}
                      secureTextEntry
                      placeholder="Repetir Contraseña"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      selectionColor="lightgrey"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoCompleteType="off"
                      onChangeText={(value) => onChange(value, 'password2')}
                      onFocus={() => setUserColor3('rgba(255, 255, 255, 0.75)')}
                      onBlur={() => setUserColor3('rgba(255, 255, 255, 0.3)')}
                      value={password2}
                      onSubmitEditing={onSubmitForm}
                    />
                  </Animated.View>

                  {/* Button Login */}
                  <View style={loginTheme.buttonContainer}>
                    <TouchableOpacity
                      style={loginTheme.button}
                      activeOpacity={0.6}
                      onPress={onSubmitForm}
                    >
                      <Text style={loginTheme.buttonText}>REGISTRO</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Link to LoginScreen */}
                <Animated.View style={[
                  loginTheme.loginFooter,
                  { marginBottom: 40 },
                  boxAnimationRegisterText
                ]} >
                  <Text style={loginTheme.text}>¿Ya tienes una cuenta?</Text>
                  <Text style={loginTheme.signUpText} onPress={() => navigation.navigate('LoginScreen')}>Acceder</Text>
                </Animated.View>
              </>
            )
            : <LoadingScreen />
        }
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
