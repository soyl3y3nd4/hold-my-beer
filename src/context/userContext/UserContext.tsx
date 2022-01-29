import React, { createContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';
import { userDetail } from '../../interfaces/Users';

type UserContextProps = {
  name: string;
  surname: string;
  avatar: string;
  birth_date: string;
  getUserDetails: () => void;
};

const initialState = {
  name: '',
  surname: '',
  birth_date: '',
  avatar: '',
};

export const UserContext = createContext(initialState as UserContextProps);

export const UserProvider = ({ children }: any) => {
  const [userDetails, setUserDetails] = useState(initialState)

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const email = auth().currentUser?.email;
    if (!email) return;

    const ref = await firestore().collection('users').doc(email).get();
    setUserDetails({ ...ref.data() } as userDetail);
  };

  return (
    <UserContext.Provider value={{ ...userDetails, getUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};