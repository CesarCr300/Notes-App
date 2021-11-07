const socket = io();

const containerNotes = document.querySelector(".notes-grid");

const formNewNote = document.querySelector(".form-new-note");
const inputNoteTitle = document.querySelector("#input-note-title");
const textAreaNoteDescription = document.querySelector(
  "#text-area-note-description"
);

const buttonsDelete = document.querySelectorAll('.btn-delete')
// console.log(buttonsDelete);

// buttonsDelete.forEach(btn=>btn.addEventListener("click",(e)=>{
//   const note = btn.parentElemnt
  
// }))

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
