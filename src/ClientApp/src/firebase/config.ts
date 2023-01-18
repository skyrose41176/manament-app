// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7jqtHG7R679nidIZVR12u9BbLck98dS4",
  authDomain: "f5s-cars.firebaseapp.com",
  projectId: "f5s-cars",
  storageBucket: "f5s-cars-insurance.appspot.com",
  messagingSenderId: "22672829521",
  appId: "1:22672829521:web:77cbf2fd80eaa55ade1c70",
  measurementId: "G-MCGYB34VMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const storageRef = ref(storage);

export { storageRef, storage };
