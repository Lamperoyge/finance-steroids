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
  const [loading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setFirestoreUser(null);
    }
  };

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged((authUser) => {
      authUser ? fetchUser(authUser) : setUser(null) && setIsLoading(false);
    });
    setIsLoading(false);
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
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/user-not-found') {
        setErrors("Woops! We couldn't find a user with this email/password");
      } else {
        setErrors('Woops! Something went wrong');
      }
    }
  };
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/user-not-found') {
        setErrors("Woops! We couldn't find a user with this email/password");
      } else {
        setErrors('Woops! Something went wrong');
      }
    }
  };

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
        errors,
        logout,
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
