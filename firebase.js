import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAB0Vhv8fIzYvtea79POeZviS_OX5u5J34",
  authDomain: "sessions-db.firebaseapp.com",
  projectId: "sessions-db",
  storageBucket: "sessions-db.appspot.com",
  messagingSenderId: "1017099017215",
  appId: "1:1017099017215:web:b7e8706b744e3dba1565ca"
});

const db = getFirestore(firebaseApp);

export { db }