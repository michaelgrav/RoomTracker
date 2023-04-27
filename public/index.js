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

import { collection, query, where, doc, getDoc, getDocs, getFirestore, writeBatch } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
const db = getFirestore(app);


// Function to reserve a room
export async function reserveRoom(roomID, roomName) {
    const docRef = doc(db, "rooms", roomID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let startTime = prompt("Please enter the start time", "Start Time");
      // Validate start and end time
      if (validateTime(startTime)) {
        let endTime = prompt("Please enter the end time", "End Time");
        if (validateTime(endTime)) {
          if (startTime < endTime) {
            const batch = writeBatch(db);
            batch.update(docRef, {"reserved": true});
            batch.update(docRef, {"startResTime": startTime});
            batch.update(docRef, {"endResTime": endTime});
            batch.update(docRef, {"reservedBy": localStorage.getItem("userUID")});

            await batch.commit();

            alert("Room " + roomName + " has been reserved!");
            location.reload();
          } else {
            alert("Start time must be before end time")
          }
        }
      } 
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

function validateTime(time) {
  if(time == "" || time == null || time == "Start Time" || time == "End Time") {
    return false
  }

  else if (time <= 0) {
    alert("Time must be greater than 0")
    return false
  }

  else if (time > 2300) {
    alert("Time must not be greater than 2300")
    return false
  }

  else {
    return true
  }
}

// Function to get all of the rooms and display them
export async function populateIndexRooms() {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    querySnapshot.forEach((doc) => {
      // Only display non-reserved rooms
      if (doc.data().reserved == false) {
        const container = document.getElementById('accordion');

        // Create card element
        const card = document.createElement('div');
        card.classList = 'card-body';
        var idx = doc.id;
        var itemStr = doc.data().items.join(", ")

        // Construct card content
        const content = 
        `<div class="card border-dark mb-3" style="min-width: 15rem;">
          <div class="card-header">Open Room</div>
          <div class="card-body text-dark">
            <h5 id="roomNameTitle" class="card-title">${doc.data().building} ${doc.data().roomNumber}</h5>
            <p class="card-text">Room Items: ${itemStr}</p>
            <p id="roomIDParagrah" hidden>${doc.id}</p>
          </div>
          <button onclick="reserveRoom(document.getElementById('roomIDParagrah').innerHTML, document.getElementById('roomNameTitle').innerHTML)" class="btn btn-primary"  style="background-color: #154734; border: none; border-radius: 0px;">Reserve Room</button>
        </div>`;

        // Append newyly created card element to the container
        container.innerHTML += content;
      }
      });

      if (localStorage.getItem("adminStatus") === null)
      {
        var q = query(collection(db, "users"), where("uid", "==", localStorage.getItem("userUID")));
        var querySnapshotUser = await getDocs(q);
        var adminStatus = null;
        querySnapshotUser.forEach((doc) =>
        {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          adminStatus = doc.data().admin
        });

        localStorage.setItem("adminStatus", adminStatus);
      }
}

export function logout() {
    localStorage.clear();
    location.reload();
    window.location = "login.html";
}