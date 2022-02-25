import { db } from 'utils/firebase-config';
import {
  doc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from 'firebase/firestore';

export const addUserWallet = async (uid, publicKey) => {
  try {
    const walletRef = await setDoc(doc(db, 'wallets', uid), {
      publicKey,
    });
    return walletRef;
  } catch (error) {
    throw new Error(error);
  }
};

export const addCollection = async (obj, uid) => {
  try {
    await setDoc(doc(db, 'collections', obj.token_address), {
      ...obj,
      created: serverTimestamp(),
      updated: serverTimestamp(),
    });
    // await setDoc(doc(db, 'users', uid), { watchlist: [] }, { merge: true });
    await updateDoc(doc(db, 'users', uid), {
      collections: arrayUnion(obj.token_address),
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserWallets = async (uid) => {
  try {
  } catch (error) {}
};
