import db from "../models";

const users = [
  {
    username: "Cesar",
    password: "contreras",
    email: "contreras@gmail.com",
  },
  {
    username: "Jesus",
    password: "contreras",
    email: "jesus@gmail.com",
  },
];

const notes = [
  {
    title: "NOTE 2",
    description: "This is the description of the note 2",
  },
  {
    title: "NOTE 1",
    description: "This is the description of the note 1",
  },
];

const associations = [{ UserId: 1, NoteId: 2 }, {UserId:2, NoteId:1}];

export async function seeds() {
  for (let i = 0; i < users.length; i++) {
    await db.User.create(users[i])
    await db.Note.create(notes[i])
  }
  await db.User_Note.create(associations[0])
  await db.User_Note.create(associations[1])
}
