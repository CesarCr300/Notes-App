
const socket = io();

const containerNotes = document.querySelector(".notes-grid");

//form
const formNewNote = document.querySelector(".form-new-note");
const inputNoteTitle = document.querySelector("#input-note-title");
const textAreaNoteDescription = document.querySelector(
  "#text-area-note-description"
);
textAreaNoteDescription.addEventListener("input", ()=>{
  autoGrow(textAreaNoteDescription)
})
//content of a note(title, description)
const contentNotes = document.querySelectorAll(".note>.content");

//btns
const btnsDelete = document.querySelectorAll(".btn-delete");
const btnsUpdate = document.querySelectorAll(".btn-update");
//creation of a note
formNewNote.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = inputNoteTitle.value;
  const description = textAreaNoteDescription.value;
  socket.emit("note:new", { title, description });
  inputNoteTitle.value = "";
  textAreaNoteDescription.value = "";
});

socket.on("note:new", (data) => {
  const note = createNote(data);
  containerNotes.appendChild(note);
});

//destroy a note
btnsDelete.forEach((btn) => eventDeleteNote(btn));

socket.on("note:destroy", (id) => {
  const note = document.querySelector(`#note-${id}`);
  note.parentElement.removeChild(note);
});

//update a note

contentNotes.forEach((content) => eventCreateEditableNote(content));

btnsUpdate.forEach((btn) => {
  eventUpdateNote(btn);
});

socket.on("note:update", (note) => updateNote(note));
