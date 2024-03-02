// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
export const storage = getStorage(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);






// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAq6gwtwBBuF80-RHNyu5Vm5jNvY3sVRY0",
//   authDomain: "oaks-project.firebaseapp.com",
//   projectId: "oaks-project",
//   storageBucket: "oaks-project.appspot.com",
//   messagingSenderId: 430273452894,
//   appId: "1:430273452894:web:c458107afd56560285cdcf"
// };

// // console.log(import.meta.env.VITE_APPID)

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // console.log(process.env.VITE_APIKEY)

// export const storage = getStorage(app)

// 
