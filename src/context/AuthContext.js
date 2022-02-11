import { auth, db } from 'utils/firebase-config';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';

import React, { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [firestoreUser, setFirestoreUser] = useState(null);
  const fetchUser = async (authUser) => {
    const userUid = authUser.uid;
    setUser(authUser);
    try {
      const userDocRef = doc(db, 'users', userUid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setFirestoreUser(docSnap.data());
      }
    } catch (error) {
      console.log(error);
      setFirestoreUser(null);
    }
  };

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged((authUser) => {
      authUser ? fetchUser(authUser) : setUser(null);
    });
    return () => {
      unlisten();
    };
  }, []);

  const signUp = async ({ email, name, password }) => {
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email,
        name,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrors(error.message);
    }
  };
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrors(errors.message);
    }
  };

  console.log(user);
  const logout = async () => {
    try {
      signOut(auth);
    } catch (error) {}
  };

  // logout();
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        signUp,
        firestoreUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};
