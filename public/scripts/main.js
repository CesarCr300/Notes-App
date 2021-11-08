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

contentNotes.forEach((content) =>
  content.addEventListener("click", (e) => {
    try {
      const titleElement = content.querySelector("h2");
      const descriptionElement = content.querySelector("p");
      const title = titleElement.innerText;
      const description = descriptionElement.innerText;
      content.removeChild(titleElement);
      content.removeChild(descriptionElement);

      const titleEditable = document.createElement("input");
      titleEditable.classList.add("note-title");
      titleEditable.value = title;

      const descriptionEditable = document.createElement("textarea");
      descriptionEditable.classList.add("note-description");
      descriptionEditable.value = description;

      content.appendChild(titleEditable);
      content.appendChild(descriptionEditable);
    } catch (error) {}
  })
);

btnsUpdate.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const content = btn.parentElement.querySelector(".content");
    const titleElement = content.querySelector("input");
    if (titleElement) {
      const descriptionElement = content.querySelector("textarea");
      const id = parseInt(content.parentElement.id.split("-")[1]);
      socket.emit("note:update", {
        id,
        title: titleElement.value,
        description: descriptionElement.value,
      });
    }
  })
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
  try {
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
  } catch (error) {
    console.log(contentElement)
  }
});
