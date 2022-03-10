// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyClxeitDlhYmjtcRXvi8TSgkgtxhtvpouw',
  authDomain: 'trackem-3998d.firebaseapp.com',
  projectId: 'trackem-3998d',
  storageBucket: 'trackem-3998d.appspot.com',
  messagingSenderId: '333246782820',
  appId: '1:333246782820:web:ad28fd2f86c10b27036e71',
  measurementId: 'G-0HLGB66RFR',
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

if (app && typeof window !== 'undefined') {
  getAnalytics(app);
}
export const auth = getAuth();
export const db = getFirestore();
export const functions = getFunctions();
