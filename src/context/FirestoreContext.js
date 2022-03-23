import React, { createContext, useReducer, useContext, useEffect } from 'react';
const FirestoreContext = createContext({});
import {
  ADD_USER_WALLETS,
  ADD_USER_WATCHLIST,
  ADD_ALERT,
  TOGGLE_TELEGRAM_NOTIFICATIONS,
} from './firestore.types';
import { db } from 'utils/firebase-config';
import {
  getUserAlerts,
  getUserWallets,
  deleteUserWallet,
} from 'services/firestore';
import { getStats } from 'utils/opensea';
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  updateDoc,
  arrayUnion,
  documentId,
  query,
  where,
  Timestamp,
  serverTimestamp,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { useAuth } from 'context/AuthContext';
import { getNftBalance } from 'services/wallet';
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
    case TOGGLE_TELEGRAM_NOTIFICATIONS:
      return {
        ...state,
        isTelegramConnected: payload,
      };
    default:
      return { ...state };
  }
};

export const FirestoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { firestoreUser } = useAuth();

  useEffect(() => {
    if (firestoreUser && firestoreUser.id) {
      getUserWallets(firestoreUser.id).then((res) =>
        dispatch({ type: ADD_USER_WALLETS, payload: res.linkedWallets })
      );
      getUserAlerts(firestoreUser.id).then((res) =>
        dispatch({ type: ADD_ALERT, payload: res })
      );
    }
    // if (unsub && typeof unsub === 'function') return () => unsub();
  }, [firestoreUser]);

  const fetchTelegramChat = async () => {
    const ref = doc(db, 'telegram-chats', firestoreUser.id);
    try {
      const doc = await getDoc(ref);
      if (doc.exists()) {
        dispatch({ type: TOGGLE_TELEGRAM_NOTIFICATIONS, payload: true });
      } else {
        dispatch({ type: TOGGLE_TELEGRAM_NOTIFICATIONS, payload: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWallet = async (wallet) => {
    if (firestoreUser.id && wallet.publicKey) {
      await deleteUserWallet(wallet, firestoreUser.id);
      dispatch({
        type: ADD_USER_WALLETS,
        payload: state.wallets.filter((i) => i.publicKey !== wallet.publicKey),
      });
    }
  };
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
          const data = await getStats(dataItem.slug);
          if (data.stats) {
            const ref = doc(db, 'collections', dataItem.token_address);
            await updateDoc(ref, {
              stats: data.stats,
              market_cap: data.stats.market_cap,
              average_price: data.stats.average_price,
              floor_price: data.stats.floor_price,
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
    if (
      firestoreUser &&
      firestoreUser.collections &&
      firestoreUser.collections.length
    ) {
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
        dispatch({
          type: ADD_USER_WALLETS,
          payload: [...state.wallets, { publicKey, portfolio: nfts }],
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
        dispatch({
          type: ADD_USER_WALLETS,
          payload: [...state.wallets, { publicKey, portfolio: nfts }],
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const listenForTelegramChanges = async () => {
    const unsub = onSnapshot(
      doc(db, 'telegram-chats', firestoreUser.id),
      (doc) => {
        const data = doc.data();
        if (data && data.chatId) {
          dispatch({ type: TOGGLE_TELEGRAM_NOTIFICATIONS, payload: true });
        }
      }
    );
  };

  const unlinkTelegram = async () => {
    await deleteDoc(doc(db, 'telegram-chats', firestoreUser.id));
    dispatch({ type: TOGGLE_TELEGRAM_NOTIFICATIONS, payload: false });
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
        deleteWallet,
        fetchTelegramChat,
        isTelegramConnected: state.isTelegramConnected,
        unlinkTelegram,
        listenForTelegramChanges,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => useContext(FirestoreContext);
