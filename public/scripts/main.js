const socket = io();

const containerNotes = document.querySelector(".notes-grid");

//form
const formNewNote = document.querySelector(".form-new-note");
const inputNoteTitle = document.querySelector("#input-note-title");
const textAreaNoteDescription = document.querySelector(
  "#text-area-note-description"
);
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

btnsUpdate.forEach((btn) =>
  eventUpdateNote(btn)
);

function updateNoteSamePage(note) {
  const { id, title, description } = note;
  const contentElement = document.querySelector(`#note-${id}>.content`);
  const inputElement = contentElement.querySelector("input");
  const textareaElement = contentElement.querySelector("textarea");

  contentElement.removeChild(inputElement);
  contentElement.removeChild(textareaElement);

  const titleElement = document.createElement("h2");
  titleElement.innerText = title;
  const descriptionElement = document.createElement("p");
  descriptionElement.innerText = description;

  contentElement.appendChild(titleElement);
  contentElement.appendChild(descriptionElement);
}

socket.on("note:update", (note) => {
  const { id, title, description } = note;
  const contentElement = document.querySelector(`#note-${id}>.content`);
  const inputElement = contentElement.querySelector("input");
  if (inputElement) {
    const textareaElement = contentElement.querySelector("textarea");

    contentElement.removeChild(inputElement);
    contentElement.removeChild(textareaElement);

    const titleElement = document.createElement("h2");
    titleElement.innerText = title;
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = description;

    contentElement.appendChild(titleElement);
    contentElement.appendChild(descriptionElement);
  } else {
    const titleElement = contentElement.querySelector("h2");
    titleElement.innerText = title;
    const descriptionElement = contentElement.querySelector("p");
    descriptionElement.innerText = description;
  }
});
