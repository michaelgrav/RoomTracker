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

export async function unreserveRoom(roomID) {
    const docRef = doc(db, "rooms", roomID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        const batch = writeBatch(db);
        batch.update(docRef, {"reserved": false});
        batch.update(docRef, {"startResTime": 9999});
        batch.update(docRef, {"endResTime": 9999});
        batch.update(docRef, {"reservedBy": ""});

        await batch.commit();
    } else {
    // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

    location.reload();
}