import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export interface AuthState {
  user: FirebaseAuthTypes.User | null;
};

type AuthAction =
  | { type: 'signUp', payload: { user: FirebaseAuthTypes.User } }
  | { type: 'signIn', payload: { user: FirebaseAuthTypes.User } }
  | { type: 'addError', payload: string }
  | { type: 'removeError' }
  | { type: 'notAuthenticated' }
  | { type: 'logOut' }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'signIn':
    case 'signUp':
      return {
        ...state,
        user: action.payload.user
      };

    case 'logOut':
      return {
        ...state,
        user: null
      };

    default:
      return {
        ...state,
        user: null
      };
  };
};
