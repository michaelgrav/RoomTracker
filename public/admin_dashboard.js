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

import { getFirestore, doc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js';
const db = getFirestore(app);

export async function cancelReservation(roomID)
{
    console.log("cancelling reservation")

    try
    {
        const docRef = await updateDoc(doc(db, "rooms", roomID),
        {
            reserved: false,
            reservedBy: ""
        });

        window.location = "admin_dashboard.html";
    } catch (e) {
        console.error("Error cancelling reservation: ", e);
    }
    
}

export async function deleteRoom(roomID)
{
    console.log("deleting room")

    try
    {
        await deleteDoc(doc(db, "rooms", roomID));
        window.location = "admin_dashboard.html";
    } catch (e) {
        console.error("Error cancelling reservation: ", e);
    }
    
}
  
