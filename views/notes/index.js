// FRONTEND JS FOR INDEX.HTML

const toggleFormBtn = document.getElementById("toggleForm");
const noteFormContainer = document.getElementById("noteFormContainer");
const noteForm = document.getElementById("noteForm");
const notesContainer = document.getElementById("notesContainer");

let editMode = false;
let editCard = null;
let editNoteId = null; // Store ID of note being edited


// Notes API
const NOTES_URL = NOTES_API_URL;

const token = localStorage.getItem("token");

if(!token){
  alert("You must login first!");
  window.location.href = "login.html";
}

// Load notes from API on page load
window.addEventListener("DOMContentLoaded", loadNotes);

// Toggle form visibility
toggleFormBtn.addEventListener("click", () => {
  noteFormContainer.classList.toggle("hidden");
  noteForm.reset();
  editMode = false;
  editCard = null;
  editNoteId = null;
});

// Handle form submission
noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !description) return;

  if (editMode && editNoteId) {
    
    /// PUT(Update operation)
    await fetch(`${NOTES_URL}/${editNoteId}`, { // Update existing note
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title, description }),
    });
    
    editMode = false;
    editCard = null;
    editNoteId = null;
  
  } else {
    
    /// POST(Create operation)
    await fetch(NOTES_URL, { // Create new note
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title, description }),
    });
  }

  // Refresh notes after save
  await loadNotes();

  // Reset form and hide
  noteForm.reset();
  noteFormContainer.classList.add("hidden");
});

// Load all notes from API
async function loadNotes() {
  notesContainer.innerHTML = ""; // Clear existing notes
  
  /// GET(Read operation)
  const res = await fetch(NOTES_URL ,{
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await res.json(); 
  const notes = data.note;

  await notes.forEach(note => {
    const card = createNoteCard(note);
    notesContainer.appendChild(card);
  });
}

// Create a note card element
function createNoteCard(note) {
  const card = document.createElement("div");
  card.className = "note-card";
  card.innerHTML = `
    <h3>${note.title}</h3>
    <p>${note.description}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;

  // Edit button
  card.querySelector(".edit-btn").addEventListener("click", () => {
    document.getElementById("title").value = note.title;
    document.getElementById("description").value = note.description;
    noteFormContainer.classList.remove("hidden");
    editMode = true;
    editCard = card;
    editNoteId = note._id; // MongoDB document ID
  });

  // Delete button
  card.querySelector(".delete-btn").addEventListener("click", async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      await fetch(`${NOTES_API_URL}/${note._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      await loadNotes(); // Refresh notes after delete
    }
  });

  return card;
}
