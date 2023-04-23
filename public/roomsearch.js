import {reserveRoom} from "./index.js" 

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

const validRoomInitials = ["AD", "AH1", "AH2", "BE", "BSB", "CR", "GC", "GR", "CB", "CB1", 
    "CB2", "CB3", "ATC", "ECSN", "ECSS", "ECSW", "JO", "MC", "FA", "FO", "FN", "HH",
    "JSOM", "PHY", "SCI", "SLC", "SSB", "SSA", "SPN"]

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { collection, query, where, getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
const db = getFirestore(app);

export async function searchRoom(roomNameInitials) {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    const container = document.getElementById('accordion');
    var roomsFound = 0
    container.innerHTML = "";

    if (!validRoomInitials.includes(roomNameInitials)) {
        const content = `
        <h1>Invalid Room Initials!</h1>
        `;

        container.innerHTML += content;
        roomsFound = -1;
    }

    querySnapshot.forEach((doc) => {
    if (doc.data().building == roomNameInitials) {
        // Create card element
        const card = document.createElement('div');
        card.classList = 'card-body';
        var idx = doc.id;
        var itemStr = doc.data().items.join(", ")

        // Construct card content
        const content = `
        <div class="card border-dark mb-3" style="min-width: 15rem;">
        <div class="card-header">Can The Room Be Reserved? ${!doc.data().reserved}</div>
        <div class="card-body text-dark">
            <h5 id="roomNameTitle" class="card-title">${doc.data().building} ${doc.data().roomNumber}</h5>
            <p class="card-text">Room Items: ${itemStr}</p>
            <p id="roomIDParagrah" hidden>${doc.id}</p>
        </div>
        <button onclick="reserveRoom(document.getElementById('roomIDParagrah').innerHTML, document.getElementById('roomNameTitle').innerHTML)" class="btn btn-primary"  style="background-color: #154734; border: none; border-radius: 0px;">Reserve Room</button>
        </div>`;

        // Append newyly created card element to the container
        container.innerHTML += content;

        roomsFound++;
    }
    });


    if (roomsFound == 0) {        
        const content = `
        <h1>No Rooms Found In That Search!</h1>
        `;

        container.innerHTML += content;
    }
}