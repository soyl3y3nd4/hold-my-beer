import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type HomeScreenProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;