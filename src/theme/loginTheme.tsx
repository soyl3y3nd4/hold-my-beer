import { StyleSheet } from "react-native";

export const loginTheme = StyleSheet.create({
  text: {
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 1.05,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    marginBottom: 30,
  },
  inputField: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    paddingVertical: 2,
    paddingLeft: 15,
    width: 270,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
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
  loginForm: {
    marginTop: 70,
    flex: 1,
  },
  loginFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    bottom: 0,
  },
  signUpText: {
    color: 'rgba(255, 211, 79, 0.85)',
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 1.05,
  },
});