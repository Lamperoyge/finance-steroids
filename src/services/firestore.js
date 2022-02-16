import { db } from 'utils/firebase-config';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

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

export const getUserWallets = async (uid) => {
  try {
  } catch (error) {}
};
