import { initializeApp } from "firebase/app";
import { getStorage , ref } from "firebase/storage";
const firebaseconfig = {
    apiKey: "AIzaSyB-57N7tmmGp9UB71ODMC8AbsVTpl0iTXI",
    authDomain: "ssafy-01-user-image.firebaseapp.com",
    databaseURL: "gs://ssafy-01-user-image.appspot.com",
    projectId: "ssafy-01-user-image",
    storageBucket: "ssafy-01-user-image.appspot.com",
    messagingSenderId: "822413762815",
    appId: "1:822413762815:web:0819a6b5a1ba5472ab2cca",
    measurementId: "G-TFV4H30S69"
  };

export const firebaseApp = initializeApp(firebaseconfig);
export const storage = getStorage(firebaseApp);
export const storageRef = ref(storage);  






















