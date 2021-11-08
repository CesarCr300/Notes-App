const socket = io();

const containerNotes = document.querySelector(".notes-grid");

const formNewNote = document.querySelector(".form-new-note");
const inputNoteTitle = document.querySelector("#input-note-title");
const textAreaNoteDescription = document.querySelector(
  "#text-area-note-description"
);
const contentNote = document.querySelectorAll(".note>.content");

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

const buttonsDelete = document.querySelectorAll(".btn-delete");

buttonsDelete.forEach((btn) => eventDeleteNote(btn));

socket.on("note:destroy", (id) => {
  const note = document.querySelector(`#note-${id}`);
  note.parentElement.removeChild(note);
});
