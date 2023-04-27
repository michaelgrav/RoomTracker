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

import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js';
const auth = getAuth();


// export async function checkAdmin(id)
// {
//     var q = query(collection(db, "users"), where("uid", "==", id));
//     const querySnapshot = await getDocs(q);
//     var adminStatus = null;
//     querySnapshot.forEach((doc) =>
//     {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//       adminStatus = doc.data().admin
//     });

//     localStorage.setItem("adminStatus", adminStatus);
//     console.log("Admin status from login, DB call:", adminStatus);
//     console.log("Admin status from login, localstorage save:", localStorage.getItem("adminStatus"));
// }

export function login(email, password) {
  if(ValidateEmail(email)) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("userUID", user.uid);
        localStorage.setItem("userEmail", user.email);
        window.location = "index.html";
      })
      .catch((error) => {
        console.log("Invalid email or password")
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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