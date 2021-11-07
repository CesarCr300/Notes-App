// const { createNote } = require("./ui");
// import {createNote} from './ui'

const socket = io();

const containerNotes = document.querySelector(".notes-grid");

const formNewNote = document.querySelector(".form-new-note");
const inputNoteTitle = document.querySelector("#input-note-title");
const textAreaNoteDescription = document.querySelector(
  "#text-area-note-description"
);

formNewNote.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = inputNoteTitle.value;
  const description = textAreaNoteDescription.value;
  socket.emit("note:new", { title, description });
});

socket.on("note:new", (data) => {
  createNote(data);
  //   const note = document.createElement("article");
  //   const title = document.createElement("h2");
  //   const description = document.createElement("p");

  //   title.innerHTML = data.title;
  //   description.innerHTML = data.description;

  //   note.classList.add("note");
  //   note.appendChild(title);
  //   note.appendChild(description);

  containerNotes.appendChild(note);
});
