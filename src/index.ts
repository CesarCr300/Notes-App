import io from "socket.io";

import app from "./app";
import db from "../models";
import { seeds } from "../seeders";

import { createNote, destroyNote, updateNote } from "./notes/controllers";

db.sequelize.sync({ force: true }).then(async () => {
  console.log("DB connected");
  seeds();
  const server = app.listen(app.get("port"), () => {
    console.log("funcionando");
  });
  const serverIo: io.Server = new io.Server(server);
  serverIo.on("connection", (socket) => {
    socket.on("note:new", async function ({ title, description }) {
      const newNote = await createNote(title, description);
      serverIo.emit("note:new", newNote);
    });
    socket.on("note:update", async({id, title, description}) => {
      const note = await updateNote(title, description, id);
      serverIo.emit("note:update", note)
      // socket.broadcast.emit("note:update otherPages")
    })
    socket.on("note:destroy", async function (id: number) {
      await destroyNote(id)
      serverIo.emit("note:destroy", (id))
    });
  });
});
