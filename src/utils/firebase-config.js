// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
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
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

if (app) {
  getAnalytics(app);
}

export const auth = firebase.auth();
export { firebase };
