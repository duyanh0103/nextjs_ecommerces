// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE0k4FbDWB_Sb3554MKk0nC0ZK6iiWY44",
  authDomain: "next-ecommerce-386803.firebaseapp.com",
  projectId: "next-ecommerce-386803",
  storageBucket: "next-ecommerce-386803.appspot.com",
  messagingSenderId: "215746952544",
  appId: "1:215746952544:web:8c1e81e2845a4dccba7205",
  measurementId: "G-29ZZ3TXF38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
// const analytics = getAnalytics(app);

export default app;
export const storage = getStorage();