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

import { collection, doc, getDoc, getDocs, getFirestore, writeBatch } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
const db = getFirestore(app);

export async function reserveRoom(roomID, roomName) {
    console.log("In reserveRoom with room ID " + roomID);

    const docRef = doc(db, "rooms", roomID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let startTime = prompt("Please enter the start time", "Start Time");
        let endTime = prompt("Please enter the end time", "End Time");

        // Validate start and end time
        if (startTime < endTime) {
            const batch = writeBatch(db);
            batch.update(docRef, {"reserved": true});
            batch.update(docRef, {"startResTime": startTime});
            batch.update(docRef, {"endResTime": endTime});
            batch.update(docRef, {"reservedBy": localStorage.getItem("userUID")});

            await batch.commit();

            alert("Room " + roomName + " has been reserved!");
        } else {
            alert("Please enter a valid start and end time (start must be before end)");
        }
    } else {
    // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

    location.reload();
}