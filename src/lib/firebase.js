// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: 'techcloud-3f058.firebaseapp.com',
  projectId: 'techcloud-3f058',
  storageBucket: 'techcloud-3f058.appspot.com',
  messagingSenderId: '343838209835',
  appId: '1:343838209835:web:f9485673510d1a8b25b76e',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
