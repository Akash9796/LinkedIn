// import  firebase from "firebase/app";
import {initializeApp} from "firebase/app"
import {getFirestore } from 'firebase/firestore'
import { getStorage} from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyAARFUnOmPkmK9cew7tJXtV9TLH27U5VLY",
    authDomain: "linkedin-7086f.firebaseapp.com",
    projectId: "linkedin-7086f",
    storageBucket: "linkedin-7086f.appspot.com",
    messagingSenderId: "1061886261028",
    appId: "1:1061886261028:web:bc38ace7f2aeda84d665b1",
    measurementId: "G-KQ4MZLYKTG"
  };
  export const app = initializeApp(firebaseConfig); 
  export const db = getFirestore(app);
  export const storage = getStorage(app);

