// Configuración de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  
  apiKey: "AIzaSyBzWTJsF7nEDsKE2KCsnEeiUGFBXGE3HRw",
  authDomain: "computenlanube-8df22.firebaseapp.com",
  projectId: "computenlanube-8df22",
  storageBucket: "computenlanube-8df22.appspot.com",
  messagingSenderId: "745180392904",
  appId: "1:745180392904:web:3dc5763a827da7b7de64fd",
  measurementId: "G-ZRSR2CFJN8"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);