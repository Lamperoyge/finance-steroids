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
  getDocs,
  query,
  where,
  deleteDoc,
  arrayRemove,
} from 'firebase/firestore';

// export const addUserWallet = async (uid, publicKey) => {
//   try {
//     const walletRef = await setDoc(doc(db, 'wallets', uid), {
//       publicKey,
//     });
//     return walletRef;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const deleteUserWallet = async (wallet, uid) => {
  try {
    await updateDoc(doc(db, 'wallets', uid), {
      linkedWallets: arrayRemove(wallet),
    });
  } catch (error) {
    console.log(error);
    alert("Woops! We weren't able to unsync this wallet");
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

export const addAlert = async (obj, user) => {
  try {
    await addDoc(collection(db, 'alerts'), {
      token_address: obj.watchlist,
      user: user.id,
      user_email: user.email,
      active: true,
      ...obj,
      created: serverTimestamp(),
      updated: serverTimestamp(),
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserWallets = async (uid) => {
  try {
  } catch (error) {}
};

export const getUserAlerts = async (uid) => {
  try {
    const q = query(collection(db, 'alerts'), where('user', '==', uid));
    const querySnapshot = await getDocs(q);
    let queryMap = [];
    querySnapshot.forEach((i) =>
      queryMap.push({
        id: i.id,
        ...i.data(),
      })
    );
    console.log(queryMap);
    return queryMap;
  } catch (error) {
    alert('Woops! Something is wrong');
    console.log(error, 'error');
  }
};

export const deleteAlert = async (id) => {
  try {
    const result = await deleteDoc(doc(db, 'alerts', id));
    return result;
  } catch (error) {
    alert('Woops! Something went wrong deleting document');
    console.log(error);
  }
};

export const deleteCollectionFromUserWatchlist = async (id, uid) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      collections: arrayRemove(id),
    });
  } catch (error) {
    console.log(error);
    alert('Woops! Something went wrong delete collection from watchlist');
  }
};

export const updateUserAlert = async (id, changes) => {
  try {
    const ref = doc(db, 'alerts', id);
    const result = await updateDoc(ref, changes);
    return result;
  } catch (error) {
    alert('Woops! Something went wrong deleting document');
    console.log(error);
  }
};
