function autoGrow(oField) {
  if (oField.scrollHeight > oField.clientHeight) {
    oField.style.height = oField.scrollHeight + "px";
  }
}
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

      removeChilds(content, [titleElement, descriptionElement]);

      const titleEditable = document.createElement("input");
      titleEditable.classList.add("note-title");
      titleEditable.value = title;

      const descriptionEditable = document.createElement("textarea");
      descriptionEditable.classList.add("note-description");
      descriptionEditable.value = description;
      descriptionEditable.addEventListener("input", (e) => {
        autoGrow(descriptionEditable);
      });

      appendChilds(content, [titleEditable, descriptionEditable]);
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
  appendChilds(content, [titleNote, descriptionNote]);
  eventCreateEditableNote(content);

  note.classList.add("note");
  note.setAttribute("id", `note-${id}`);
  appendChilds(note, [content, btnDelete, btnUpdate]);
  return note;
}

function updateNote(note) {
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
}
