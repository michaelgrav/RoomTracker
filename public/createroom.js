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

import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js';
const db = getFirestore(app);

export async function createRoom(roomNumber, building, items) {
    console.log("creating room")

    // Convert the items into an array

    var itemArr = items.toLowerCase().split(" ");
    console.log(itemArr);

    try {
        const docRef = await addDoc(collection(db, "rooms"), {
            building: building,
            roomNumber: roomNumber,
            items: itemArr,
            endResTime: 9999,
            startResTime: 9999,
            reserved: false,
            reservedBy: ""
        });
        console.log("Room written with ID: ", docRef.id);

        window.location = "index.html";
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    
}
  
