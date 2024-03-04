// import {initializeApp} from 'firebase/app'
import { initializeApp } from 'firebase/app';
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyACmRCPM8idnogsrmKdRyvC4yx5-dE12Ok",
    authDomain: "test-c06af.firebaseapp.com",
    projectId: "test-c06af",
    storageBucket: "test-c06af.appspot.com",
    messagingSenderId: "87238249563",
    appId: "1:87238249563:web:6c28473be51d3b21a2037e",
    measurementId: "G-72GT5RTKLS"
  };
  
 const Firebase = initializeApp(firebaseConfig)
 export default Firebase
  