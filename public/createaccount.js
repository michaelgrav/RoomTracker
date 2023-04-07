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

import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js';

const auth = getAuth();

//var email = "michaeldgrav@gmail.com"
//var password = "testingtest" // PASSWORD MUST BE 6 CHARACTERS OR LESS 
export function createAccount(email, password) {
    console.log("creating account")

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        console.log("user uid " + user.uid);
        console.log("user emai " + user.email);
        addUserToDB(user.uid, user.email)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}


import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js';
const db = getFirestore(app);

async function addUserToDB(userUID, userEmail) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
        uid: userUID,
        email: userEmail
        });
        console.log("Document written with ID: ", docRef.id);

        localStorage.setItem("userUID", userUID);
        localStorage.setItem("userEmail", userEmail);
        window.location = "index.html";
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
  
