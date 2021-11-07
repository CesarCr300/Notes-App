global function createNote({ title, description }) {
  const note = document.createElement("article");
  const title = document.createElement("h2");
  const description = document.createElement("p");

  title.innerHTML = title;
  description.innerHTML = description;

  note.classList.add("note");
  note.appendChild(title);
  note.appendChild(description);
  return note;
}

// module.exports = { createNote };
