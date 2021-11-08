function eventDeleteNote(btn) {
  btn.addEventListener("click", (e) => {
    const note = btn.parentNode;
    const noteId = note.id.split("-")[1];
    socket.emit("note:destroy", parseInt(noteId));
  });
}

function eventCreateEditableNote(content) {
  content.addEventListener("click", (e) => {
    const titleElement = content.querySelector("h2");
    if (titleElement) {
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
    }
  });
}

function eventUpdateNote(btn) {
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
  });
}

function createNote({ title, description, id }) {
  const note = document.createElement("article");
  const content = document.createElement("div");
  const titleNote = document.createElement("h2");
  const descriptionNote = document.createElement("p");
  const btnDelete = document.createElement("button");
  const btnUpdate = document.createElement("button");

  titleNote.innerHTML = title;
  titleNote.classList.add("note-title");

  descriptionNote.innerHTML = description;
  descriptionNote.classList.add("note-description");

  btnDelete.innerHTML = "Delete";
  btnDelete.classList.add("btn-delete");
  eventDeleteNote(btnDelete);

  btnUpdate.innerHTML = "Update";
  btnUpdate.classList.add("btn-update");
  eventUpdateNote(btnUpdate);

  content.classList.add("content");
  content.appendChild(titleNote);
  content.appendChild(descriptionNote);
  eventCreateEditableNote(content);

  note.classList.add("note");
  note.setAttribute("id", `note-${id}`);
  note.appendChild(content);
  note.appendChild(btnUpdate);
  note.appendChild(btnDelete);
  return note;
}
