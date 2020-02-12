import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

// const config = {
//   apiKey: 'AIzaSyBm-blSN5fSmAPeenEjkZdC2P_3rG1nv-4',
//   authDomain: 'keep-clone-beb11.firebaseapp.com',
//   databaseURL: 'https://keep-clone-beb11.firebaseio.com',
//   projectId: 'keep-clone-beb11',
//   storageBucket: 'keep-clone-beb11.appspot.com',
//   messagingSenderId: '891394982589',
//   appId: '1:891394982589:web:7a3f3fc2705017ebf0edd4',
//   measurementId: 'G-N4LTM1VGMZ',
// };

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

firebase.initializeApp(config);

export default firebase;
