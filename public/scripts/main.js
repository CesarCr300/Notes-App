const socket = io();

const containerNotes = document.querySelector(".notes-grid");

const formNewNote = document.querySelector(".form-new-note");
const inputNoteTitle = document.querySelector("#input-note-title");
const textAreaNoteDescription = document.querySelector(
  "#text-area-note-description"
);
let contentNote = document.querySelectorAll(".note>.content");

formNewNote.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = inputNoteTitle.value;
  const description = textAreaNoteDescription.value;
  socket.emit("note:new", { title, description });
});

socket.on("note:new", (data) => {
  const note = createNote(data);
  containerNotes.appendChild(note);
});

const buttonsDelete = document.querySelectorAll(".btn-delete");

buttonsDelete.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const note = btn.parentNode;
    const noteId = note.id.split("-")[1];
    socket.emit("note:destroy", parseInt(noteId));
    buttonsDelete = document.querySelectorAll(".btn-delete");
  })
);

socket.on("note:destroy", (id) => {
  const note = document.querySelector(`#note-${id}`);
  note.parentElement.removeChild(note);
});
