// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {  
  apiKey: "AIzaSyClWTm6yvT2-ETV_jOYVkiZQLQWzp2iY2s", 
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

// PASSWORD MUST BE 6 CHARACTERS OR LESS 
export function createAccount(email, password, fName, lName) {
    console.log("creating account")
    console.log("fname in createAccount:" + fName);
    console.log("lname in createAccount:" +lName);

    if(ValidateEmail(email)) {
        if (fName == "" || fName == null || lName == "" || lName == null) {
            alert("First name or last name is blank!");
        } else {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                console.log("user uid " + user.uid);
                console.log("user emai " + user.email);
                addUserToDB(user.uid, user.email, fName, lName)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
        }
    } else {
        alert("Invalid email address format!");
    }
}

function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}


import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js';
const db = getFirestore(app);

async function addUserToDB(userUID, userEmail, fName, lName) {
    console.log("fname in addUserToDB:" + fName);
    console.log("lname in addUserToDB:" +lName);

    try {
        const docRef = await addDoc(collection(db, "users"), {
            admin: false,
            uid: userUID,
            email: userEmail,
            numRoomsReserved: 0,
            roomsReserved: [],
            firstName: fName,
            lastName: lName
        });
        console.log("Document written with ID: ", docRef.id);
        
        localStorage.setItem("adminStatus", false);
        localStorage.setItem("userUID", userUID);
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userFName", fName);
        localStorage.setItem("userLName", lName);
        window.location = "index.html";
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
  
