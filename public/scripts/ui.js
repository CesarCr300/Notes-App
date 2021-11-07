function createNote({ title, description }) {
  const note = document.createElement("article");
  const titleNote = document.createElement("h2");
  const descriptionNote = document.createElement("p");
  const btnDelete = document.createElement("button");
  const btnUpdate = document.createElement("button");

  titleNote.innerHTML = title;
  descriptionNote.innerHTML = description;
  btnDelete.innerHTML = "Delete";
  btnUpdate.innerHTML = "Update";

  note.classList.add("note");
  note.appendChild(titleNote);
  note.appendChild(descriptionNote);
  note.appendChild(btnUpdate);
  note.appendChild(btnDelete);
  return note;
}
