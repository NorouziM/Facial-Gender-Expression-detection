import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
//
import { FIREBASE_API } from '../config';

// ----------------------------------------------------------------------

const firebaseApp = initializeApp(FIREBASE_API);

const AUTH = getAuth(firebaseApp);

const DB = getFirestore(firebaseApp);

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: 'firebase',
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [profile, setProfile] = useState(null);

  useEffect(
    () =>
      onAuthStateChanged(AUTH, async (user) => {
        if (user) {
          const userRef = doc(DB, 'users', user.uid);

          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }

          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: false, user: null },
          });
        }
      }),
    [dispatch]
  );

  const login = (email, password) => signInWithEmailAndPassword(AUTH, email, password);

  const register = ({email, password, firstName, lastName, phoneNumber}) =>
    createUserWithEmailAndPassword(AUTH, email, password).then(async (res) => {
      const userRef = doc(collection(DB, 'users'), res.user?.uid);

      await setDoc(userRef, {
        uid: res.user?.uid,
        email,
        displayName: `${firstName} ${lastName}`,
        phoneNumber
      });
    });

  const logout = () => signOut(AUTH);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: state?.user?.uid,
          email: state?.user?.email,
          photoURL: state?.user?.photoURL || profile?.photoURL,
          displayName: state?.user?.displayName || profile?.displayName,
          phoneNumber: state?.user?.phoneNumber || profile?.phoneNumber || '',
          about: profile?.about || '',
        },
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
