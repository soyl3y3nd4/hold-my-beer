import React, { createContext, Dispatch, SetStateAction, useReducer, useState } from 'react';
import { authReducer } from './authReducer';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface LoginCreds {
  email: string;
  password: string;
}
interface signInUpResp {
  status: string;
  message: string;
}

type AuthContextProps = {
  user: FirebaseAuthTypes.User | null;
  authenticate: (user: FirebaseAuthTypes.User) => void;
  signUp: (login: LoginCreds) => Promise<signInUpResp>;
  signIn: (login: LoginCreds) => Promise<signInUpResp>;
  logOut: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const initialState = {
  user: null,
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const authenticate = (firebaseUser: FirebaseAuthTypes.User): void => {
    if (!firebaseUser) return;
    dispatch({ type: 'signIn', payload: { user: firebaseUser } });
  };

  const signUp = async ({ email, password }: LoginCreds): Promise<signInUpResp> => {
    const signUpResp = {
      message: 'Registered successfully',
      status: 'ok',
    };

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      await auth().currentUser?.sendEmailVerification();

      return signUpResp;

    } catch (error: any) {
      signUpResp.message = 'Error while creating user';
      signUpResp.status = 'no ok';

      if (error.code === 'auth/email-already-in-use') {
        signUpResp.message = 'That email address is already in use!';
      }

      if (error.code === 'auth/invalid-email') {
        signUpResp.message = 'That email address is invalid!';
      }
      return signUpResp;
    }
  };

  const signIn = async ({ email, password }: LoginCreds): Promise<signInUpResp> => {
    const respSignIng = {
      message: 'Login successful',
      status: 'ok',
    };

    try {
      const userCred = await auth().signInWithEmailAndPassword(email, password);
      console.log(userCred);
      await auth().currentUser?.reload();

      const user = auth().currentUser;


      if (hasUserVerifiedEmail()) {
        authenticate(user!);
      } else {
        throw new Error('User email waiting to be verified');
      }

      return respSignIng;
    } catch (error: any) {
      if (auth().currentUser) {
        auth().signOut();
      }

      respSignIng.message = "Error while trying to login"
      respSignIng.status = 'no ok';

      if (!hasUserVerifiedEmail()) {
        respSignIng.message = "Email not verified, please check your email"
      }

      if (error.code === 'auth/user-not-found') {
        respSignIng.message = 'Invalid user/password combination!';
      }

      if (error.code === 'auth/invalid-email') {
        respSignIng.message = 'That email address is invalid!';
      }

      if (error.code === 'auth/wrong-password') {
        respSignIng.message = 'Invalid user/password combination!';
      }

      console.log(error);
      return respSignIng;
    }
  };

  const logOut = async () => {
    auth().signOut();
    dispatch({ type: 'logOut' });
  };

  const hasUserVerifiedEmail = () => {
    const user = auth().currentUser;

    return (user && user?.emailVerified);
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      authenticate,
      signIn,
      signUp,
      logOut,
      isLoading,
      setIsLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
