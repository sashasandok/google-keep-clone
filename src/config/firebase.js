import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBm-blSN5fSmAPeenEjkZdC2P_3rG1nv-4",
  authDomain: "keep-clone-beb11.firebaseapp.com",
  databaseURL: "https://keep-clone-beb11.firebaseio.com",
  projectId: "keep-clone-beb11",
  storageBucket: "keep-clone-beb11.appspot.com",
  messagingSenderId: "891394982589",
  appId: "1:891394982589:web:7a3f3fc2705017ebf0edd4",
  measurementId: "G-N4LTM1VGMZ"
};

firebase.initializeApp(config);

export default firebase;
