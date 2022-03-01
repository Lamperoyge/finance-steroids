import React, { createContext, useReducer, useContext, useEffect } from 'react';
const FirestoreContext = createContext({});
import {
  ADD_USER_WALLETS,
  ADD_USER_WATCHLIST,
  ADD_ALERT,
} from './firestore.types';
import { db } from 'utils/firebase-config';
import { getUserAlerts } from 'services/firestore';

import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
  runTransaction,
  documentId,
  query,
  where,
  Timestamp,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { useAuth } from 'context/AuthContext';
import { getNftBalance } from 'services/wallet';
import axios from 'axios';

const INITIAL_STATE = {
  wallets: [],
  watchlist: [],
  alerts: [],
};

const reducer = function (state, { type, payload }) {
  switch (type) {
    case ADD_USER_WALLETS:
      return {
        ...state,
        wallets: payload,
      };
    case ADD_USER_WATCHLIST:
      return {
        ...state,
        watchlist: payload,
      };
    case ADD_ALERT:
      return {
        ...state,
        alerts: payload,
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
      getUserAlerts(firestoreUser.id).then((res) =>
        dispatch({ type: ADD_ALERT, payload: res })
      );
      unsub = getUserWallets();
    }
    if (unsub && typeof unsub === 'function') return () => unsub();
  }, [firestoreUser]);

  const addToWatchlist = (items) => {
    dispatch({ type: ADD_USER_WATCHLIST, payload: items });
  };

  const addAlert = (item) => {
    dispatch({ type: ADD_ALERT, payload: [...state.alerts, item] });
  };

  const timestampToMinutes = (timestamp) => {
    return Math.floor(timestamp / 60000);
  };

  const fetchCollections = async () => {
    const q = query(
      collection(db, 'collections'),
      where(documentId(), 'in', firestoreUser.collections)
    );

    const querySnapshot = await getDocs(q);
    let items = [];
    querySnapshot.forEach(async (query) => {
      let dataItem = query.data();
      const updatedDate = dataItem.updated;
      const currentDate = Timestamp.now();
      if (updatedDate) {
        const diff =
          timestampToMinutes(currentDate.toMillis()) -
          timestampToMinutes(updatedDate.toMillis());
        if (diff > 30) {
          //update stats
          const { data } = await axios.post('/api/update-stats', {
            slug: dataItem.slug,
          });
          if (data.stats) {
            const ref = doc(db, 'collections', dataItem.token_address);
            await updateDoc(ref, {
              stats: data.stats,
              updated: serverTimestamp(),
            });
            dataItem.stats = data.stats;
          }
        }
      }
      items.push(dataItem);
    });
    dispatch({
      type: ADD_USER_WATCHLIST,
      payload: items,
    });
  };

  const deleteUserAlert = (id) =>
    dispatch({
      type: ADD_ALERT,
      payload: state.alerts.filter((i) => i.id !== id),
    });
  useEffect(async () => {
    if (firestoreUser && firestoreUser.collections) {
      fetchCollections();
    }
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
      value={{
        addUserWallet,
        wallets: state.wallets,
        watchlist: state.watchlist,
        fetchCollections,
        addToWatchlist,
        alerts: state.alerts,
        addUserAlert: addAlert,
        deleteUserAlert,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
