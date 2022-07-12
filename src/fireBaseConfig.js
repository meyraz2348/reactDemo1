import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBzz0tXCBbSLCrk-e2aYdIbVm-B3ohirdA",
  authDomain: "reacttestproject-2d06d.firebaseapp.com",
  databaseURL: "https://reacttestproject-2d06d-default-rtdb.firebaseio.com/",
  projectId: "reacttestproject-2d06d",
  storageBucket: "reacttestproject-2d06d.appspot.com",
  messagingSenderId: "67374449561",
  appId: "1:67374449561:web:384c6b5e6be7fca9620908",
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase();
