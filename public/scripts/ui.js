function createNote({ title, description, id }) {
  const note = document.createElement("article");
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
  btnUpdate.innerHTML = "Update";
  btnUpdate.classList.add("btn-update");

  note.classList.add("note");
  note.setAttribute("id", `note-${id}`);
  note.appendChild(titleNote);
  note.appendChild(descriptionNote);
  note.appendChild(btnUpdate);
  note.appendChild(btnDelete);
  return note;
}
