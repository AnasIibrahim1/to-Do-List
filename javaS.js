
// Select essential elements
const button = document.querySelector(".btn_update");
const main = document.getElementById("main");
const inp = document.querySelector("input");
const counterElement = document.getElementById("task-counter"); 
const notificationElement = document.getElementById("notification");
let noteStorage = JSON.parse(localStorage.getItem('story')) || [];
let div = '';

// Load notes and set up event listeners on window load
window.onload = () => {
    showData();
    main.addEventListener("click", handleMainClick);
    button.addEventListener("click", addNote);
    updateCounter();
}

// Function to add a note when the "Update" button is clicked
function addNote(eo) {
    eo.preventDefault();
    
    // Check if input is not empty
    if (inp.value.trim() === "") {
        alert("Enter your hint !!");
    } else {
        const note = createNoteElement(inp.value);
        
        // Append the note to the main section
        main.appendChild(note);
        
        // Save the new note to localStorage
        noteStorage.push(inp.value);
        localStorage.setItem('story', JSON.stringify(noteStorage));
  updateCounter()
  showNotification("Note added successfully!", "success");
        // Clear the input field after adding the note
        inp.value = "";
    }
}

// Function to create the note element structure
function createNoteElement(noteText) {
    // Create the note container
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    
    // Star section
    const starDiv = document.createElement('div');
    starDiv.classList.add('div');
    const starIcon = document.createElement('span');
    starIcon.classList.add('icon-star-full');
    starDiv.appendChild(starIcon);
    
    // Text section
    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    const h4 = document.createElement('h4');
    h4.classList.add('h4');
    h4.innerText = noteText;
    textDiv.appendChild(h4);
    
    // Icons section (bin, angry/heart, and edit)
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('div');
    
    const binIcon = document.createElement('span');
    binIcon.classList.add('icon-bin2');
    
    const angryIcon = document.createElement('span');
    angryIcon.classList.add('icon-angry2');
    
    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit');
    
    iconDiv.append(binIcon, angryIcon, editIcon);
    
    // Append all sections to the note container
    noteDiv.append(starDiv, textDiv, iconDiv);
    
    return noteDiv;
}

// Function to handle various click events (delete, edit, toggle heart/angry, and star)
function handleMainClick(eo) {
    const target = eo.target;
    
    switch (target.className) {
        // Delete the note
        case "icon-bin2":
            deleteNote(target);
            break;
        
        // Toggle between angry and heart
        case "icon-angry2":
            toggleAngryToHeart(target);
            break;
            
        case "icon-heart":
            toggleHeartToAngry(target);
            break;

        // Edit the note
        case "fas fa-edit":
            editNote(target);
            break;

        // Star the note
        case "icon-star-full":
            toggleStar(target);
            break;
        
        case "icon-star-full Star_active":
            toggleStar(target);
            break;
    }
}

// Delete note function
function deleteNote(target) {
    const noteElement = target.parentElement.parentElement;
    noteElement.style.transform = "scale(0)";
    showNotification("Note deleted successfully!", "danger");
    setTimeout(() => {
        noteElement.remove();
        
        // Update localStorage
        const noteText = noteElement.querySelector('.h4').innerText;
        const noteIndex = noteStorage.indexOf(noteText);
        if (noteIndex > -1) {
            noteStorage.splice(noteIndex, 1);
            localStorage.setItem('story', JSON.stringify(noteStorage));
            updateCounter()
        }
    }, 1000);
}

// Toggle from angry to heart (mark as done)
function toggleAngryToHeart(target) {
    const noteElement = target.parentElement.parentElement;
    target.classList.remove("icon-angry2");
    target.classList.add("icon-heart");
    noteElement.querySelector('.h4').classList.add("angry");
    showNotification(" Done !", "sucessfully");
}

// Toggle from heart back to angry
function toggleHeartToAngry(target) {
    const noteElement = target.parentElement.parentElement;
    target.classList.remove("icon-heart");
    target.classList.add("icon-angry2");
    noteElement.querySelector('.h4').classList.remove("angry");
    showNotification(" Haven't done yet !", "info");
}

// Edit note function
function editNote(target) {
    const noteElement = target.parentElement.parentElement;
    const h4 = noteElement.querySelector('.h4');
    const oldText = h4.innerText; // Store the old text before editing

    // Prompt the user to edit the note
    const newInput = prompt("Edit your note:", oldText);
    
    if (newInput !== null && newInput.trim() !== "") {
        // Update the note's displayed text
        h4.innerText = newInput;
        showNotification("Note edited successfully!", "info");
        // Find the note in local storage and update it
        const noteIndex = noteStorage.indexOf(oldText); // Find the index of the old note text
        if (noteIndex > -1) {
            noteStorage[noteIndex] = newInput; // Replace old note with the new one
            localStorage.setItem('story', JSON.stringify(noteStorage)); // Update local storage
        }
    }
}


// Toggle star and move the note
function toggleStar(target) {
    const noteElement = target.parentElement.parentElement;
    
    if (target.classList.contains('Star_active')) {
        // Remove star and move to the bottom
        target.classList.remove("Star_active");
        main.appendChild(noteElement);
    } else {
        // Add star and move to the top
        target.classList.add("Star_active");
        main.prepend(noteElement);
    }
}

// Load notes from local storage and display them
function showData() {
    noteStorage = JSON.parse(localStorage.getItem('story')) || [];
    noteStorage.forEach(noteText => {
        const note = createNoteElement(noteText);
        main.appendChild(note);
  updateCounter()
    });
}
function updateCounter() {
    counterElement.innerText = `Total Tasks: ${noteStorage.length}`;
  }

  function showNotification(message, type) {
    notificationElement.innerText = message;
    notificationElement.className = `notification show ${type}`;
    
    // Hide the notification after 3 seconds
    setTimeout(() => {
      notificationElement.classList.remove("show");
    }, 3000);
  }

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const button = document.querySelector(".btn_update")
// console.log(button)
// const main = document.getElementById("main")
// console.log(main)
// const inp = document.querySelector("input")
// let par = document.querySelector(".Done")
// console.log(inp)
// let counter = 0;
// let note = [];
// let noteStorage = [];
// let div =''
// // When Window Loaded
// window.onload = () => {
// showData()
// deleteNote()
// }

// // Start Event of Button
// button.addEventListener("click",
// (eo) => {
//   eo.preventDefault()
//   if(inp.value == 0){
//     alert("Enter your hint !! ")
//   }
//   else{
//      div = `<div class="note">
//         <div class="div">
//             <span class="icon-star-full"></span>
//         </div>
//     <div class="text">
//         <h4 class ="h4">${inp.value}</h4>
//     </div>
//     <div class="div">
//         <span class="icon-angry2"></span>
//         <i class="fas fa-edit"></i>
//         <span class="icon-bin2"></span>
//     </div>`
//     main.innerHTML += div;
//     noteStorage.push(inp.value)
//     // counter++
//     localStorage.setItem('story' ,JSON.stringify(noteStorage))
//   }
// })  
// // End Event of Button

// main.addEventListener("click", (eo) => {
//   switch (eo.target.className) {
// // Start Recycle Ben Event
//     case "icon-bin2":
//       eo.target.parentElement.parentElement.style.transform = "scale(0)"
//       setTimeout(() => {
//       eo.target.parentElement.parentElement.remove()
//       }, 1000);
//       deleteNote(eo.target)
//       break;
// // End Recycle Ben Event

// // Start Angry Event "change to heart and return"
//       case "icon-angry2":
//       console.log("angry")
//       eo.target.classList.remove("icon-angry2")
//       eo.target.classList.add("icon-heart")
//       eo.target.parentElement.parentElement.getElementsByClassName("h4")[0].classList.add("angry")     
//       break;
// // End Angry Event

// // Start Heart Event
// case "icon-heart":
//   console.log("heart")
//   eo.target.parentElement.parentElement.getElementsByClassName("h4")[0].classList.remove("angry")
//   eo.target.classList.remove("icon-heart")
//   eo.target.classList.add("icon-angry2")
//   break;
// // End Heart Event

// // Start Star Event
//       case "icon-star-full":
//       console.log("star")
//       eo.target.classList.add("Star_active");
//       main.prepend(eo.target.parentElement.parentElement)
//       break;
    
//       case "icon-star-full Star_active" :
//       eo.target.classList.remove("Star_active")
//       main.append(eo.target.parentElement.parentElement)
//         break;

// //  Edit text 
//     case "fas fa-edit":
//     const h4 = eo.target.parentElement.parentElement.querySelector('.h4');
//     const newInput = prompt("Edit your note:", h4.innerText);
//     if (newInput !== null && newInput.trim() !== "") {
//       // Update the note's displayed text
//       h4.innerText = newInput;

//       // Find the note in local storage and update it
//       const noteIndex = noteStorage.indexOf(h4.innerText);
//       if (noteIndex > -1) {
//           noteStorage[noteIndex] = newInput;
//           localStorage.setItem('story', JSON.stringify(noteStorage));
//       }
//   }
//   break;
// }
// })


// function showData(){
//     note = JSON.parse(localStorage.getItem('story'))
//     for (let i = 0; i < note.length; i++) {
// div = `<div class="note">
//         <div class="div">
//             <span class="icon-star-full"></span>
//         </div>
//     <div class="text">
//         <h4 class ="h4">${note[i]}</h4>
//     </div>
//     <div class="div">
//         <span class="icon-bin2"></span>
//         <i class="fas fa-edit"></i>
//         <span class="icon-angry2"></span>
//     </div>`
//     main.innerHTML += div;
//     }
// } 

// function deleteNote(e){
//     console.log(e)
// }


