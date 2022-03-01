import { initializeApp } from 'firebase-admin/app';
const functions = require('firebase-functions');
const serviceAccount = require('../../serviceAccountKey.json');

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.sendAlert = functions.firestore
  .document('collections')
  .onUpdate((change, context) => {
    console.log(change, context, '======');
    const data = change.after.data();
    const previous = change.before.data();
    console.log(data, previous);
    return;
  });
