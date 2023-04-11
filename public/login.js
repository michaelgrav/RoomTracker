// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = { 
  
  authDomain: "cs3354-roomtracker.firebaseapp.com",
  projectId: "cs3354-roomtracker",
  storageBucket: "cs3354-roomtracker.appspot.com",
  messagingSenderId: "802621464013",
  appId: "1:802621464013:web:717e234765bd061fddb884"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js';

const auth = getAuth();

export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      localStorage.setItem("userUID", user.uid);
      localStorage.setItem("userEmail", user.email);
      window.location = "index.html";
      // ...
    })
    .catch((error) => {
      console.log("Invalid email or password")
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}