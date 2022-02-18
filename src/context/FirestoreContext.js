import React, { createContext, useReducer, useContext, useEffect } from 'react';
const FirestoreContext = createContext({});
import { ADD_USER_WALLETS } from './firestore.types';
import { db } from 'utils/firebase-config';
import {
  doc,
  addDoc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
  runTransaction,
} from 'firebase/firestore';
import { useAuth } from 'context/AuthContext';
import { getNftBalance } from 'services/wallet';

const INITIAL_STATE = {
  wallets: [],
};

const reducer = function (state, { type, payload }) {
  switch (type) {
    case ADD_USER_WALLETS:
      return {
        ...state,
        wallets: payload,
      };
    default:
      return { ...state };
  }
};

export const FirestoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { firestoreUser } = useAuth();

  useEffect(() => {
    const getUserWallets = async function () {
      return onSnapshot(doc(db, 'wallets', firestoreUser.id), (snap) => {
        if (snap.data()) {
          dispatch({
            type: ADD_USER_WALLETS,
            payload: snap.data().linkedWallets,
          });
        }
      });
    };
    let unsub;
    if (firestoreUser && firestoreUser.id) {
      unsub = getUserWallets();
    }
    if (unsub && typeof unsub === 'function') return () => unsub();
  }, [firestoreUser]);

  const addUserWallet = async (publicKey) => {
    const docRef = doc(db, 'wallets', firestoreUser.id);
    try {
      const walletDoc = await getDoc(docRef);

      if (walletDoc.exists()) {
        const nfts = await getNftBalance(publicKey);
        await updateDoc(docRef, {
          linkedWallets: arrayUnion({ publicKey, portfolio: nfts }),
        });
      } else {
        const nfts = await getNftBalance(publicKey);

        await setDoc(
          docRef,
          {
            linkedWallets: [
              {
                publicKey,
                portfolio: nfts,
              },
            ],
          },
          { merge: true }
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <FirestoreContext.Provider
      value={{ addUserWallet, wallets: state.wallets }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
