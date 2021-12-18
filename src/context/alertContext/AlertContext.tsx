import React, { createContext, useState } from 'react';
import { CustomAlert } from '../../components/CustomAlert';

interface AlertProps {
  isOpen: boolean;
  message: string;
  buttonText: string;
};

type AuthContextProps = {
  isOpen: boolean;
  message: string;
  buttonText: string;
  showAlert: (alertProps: AlertProps) => void;
  closeAlert: () => void;
};

const initialState = {
  isOpen: false,
  message: '',
  buttonText: '',
};

export const AlertContext = createContext(initialState as AuthContextProps);

export const AlertProvider = ({ children }: any) => {
  const [alertState, setAlertState] = useState<AlertProps>(initialState);

  const showAlert = ({ message, buttonText = 'OK' }: AlertProps) => {
    setAlertState({
      isOpen: true,
      message,
      buttonText,
    });
  };

  const closeAlert = () => {
    setAlertState(initialState);
  };

  return (
    <AlertContext.Provider value={{
      ...alertState,
      showAlert,
      closeAlert,
    }}>
      {children}
      <CustomAlert {...alertState} close={closeAlert} />
    </AlertContext.Provider>
  );
};