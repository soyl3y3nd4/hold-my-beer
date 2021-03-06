import React, { useContext } from 'react';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Animated from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../context/authContext/AuthContext';
import { useForm } from '../hooks/useForm';
import { loginTheme } from '../theme/loginTheme';

import { LoadingScreen } from './LoadingScreen';
import { HomeScreenProp } from '../interfaces/Navigation';
import { AlertContext } from '../context/alertContext/AlertContext';

import { useAnimatedBorder } from '../hooks/userAnimatedBorder';
import { KeyboardContext } from '../context/keyboardContext/KeyboardContext';

export const LoginScreen = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const { width } = useWindowDimensions();

  const { isLoading, signIn, setIsLoading } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const { boxAnimationLoginText } = useContext(KeyboardContext);

  const { onChange, email, password } = useForm({ email: '', password: '' });
  const { rStyle, setUserColor } = useAnimatedBorder();
  const { rStyle: rStyle2, setUserColor: setUserColor2 } = useAnimatedBorder();

  const onLogin = async () => {
    if (email.length === 0 || password.length === 0) {
      return showAlert({
        isOpen: true,
        buttonText: 'CERRAR',
        message: 'El email y password son obligatorios',
      });
    }

    setIsLoading(true);
    const resp = await signIn({ email, password })
    setIsLoading((loading) => !loading);

    if (resp.status === 'ok') return;

    showAlert({
      isOpen: true,
      buttonText: 'CLOSE',
      message: resp.message
    });
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
        source={require('../images/piledbeers1.jpg')}
        resizeMode="cover"
      />
      <ScrollView contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}>
        <Image
          style={{ width: 240, height: 90, marginTop: 70, top: 10 }}
          source={require('../images/holdmybeer2.png')}
        />
        {
          !isLoading
            ? (
              <>
                <View style={{
                  ...loginTheme.loginForm,
                  marginTop: 70,
                  width: width * 0.8,
                }}>
                  {/* Input User */}
                  <Animated.View style={[loginTheme.inputContainer, rStyle]}>
                    <Icon name="person-outline" size={20} color="rgba(255, 255, 255, 0.3)" />
                    <TextInput
                      style={loginTheme.inputField}
                      placeholder="Usuario"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      keyboardType="email-address"
                      onFocus={() => setUserColor('rgba(255, 255, 255, 0.75)')}
                      onBlur={() => setUserColor('rgba(255, 255, 255, 0.3)')}
                      selectionColor="lightgrey"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoCompleteType="off"
                      onChangeText={(value) => onChange(value, 'email')}
                      value={email}
                      onSubmitEditing={onLogin}
                    />
                  </Animated.View>

                  {/* Input Password */}
                  <Animated.View style={[loginTheme.inputContainer, rStyle2]}>
                    <Icon name="lock-closed-outline" size={20} color="rgba(255,255,255,0.5)" />
                    <TextInput
                      style={loginTheme.inputField}
                      secureTextEntry
                      placeholder="Contrase??a"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      // underlineColorAndroid="white"
                      onFocus={() => setUserColor2('rgba(255, 255, 255, 0.75)')}
                      onBlur={() => setUserColor2('rgba(255, 255, 255, 0.3)')}
                      selectionColor="lightgrey"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoCompleteType="off"
                      onChangeText={(value) => onChange(value, 'password')}
                      value={password}
                      onSubmitEditing={onLogin}
                    />
                  </Animated.View>

                  {/* Button Login */}
                  <View style={loginTheme.buttonContainer}>
                    <TouchableOpacity
                      style={{
                        ...loginTheme.button,
                        alignSelf: 'center',
                      }}
                      activeOpacity={0.7}
                      onPress={onLogin}
                    >
                      <Text style={{
                        ...loginTheme.buttonText,
                        fontSize: 22,
                      }}>Entrar</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Animated.View style={[loginTheme.loginFooter, boxAnimationLoginText]} >
                  <Text style={loginTheme.text}>??No tienes una cuenta?</Text>
                  <Text style={loginTheme.signUpText} onPress={() => navigation.navigate('RegisterScreen')}>Registrarse</Text>
                </Animated.View>
              </>
            )
            : <LoadingScreen />
        }
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
