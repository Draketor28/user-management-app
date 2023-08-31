import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3xD_sMqT2S6neM_NbB321fcXeXqlz9NY",
  authDomain: "vue3-crud-2113e.firebaseapp.com",
  projectId: "vue3-crud-2113e",
  storageBucket: "vue3-crud-2113e.appspot.com",
  messagingSenderId: "1012840254106",
  appId: "1:1012840254106:web:3eaed747f62c899d342d23",
  measurementId: "G-JZLVJ950HH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();