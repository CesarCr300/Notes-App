import express from "express";
import User from "./user/model";
import Notes from "./notes/model";

const app = express();
app.set("port", process.env.PORT || 3000);

// app.get("/", async (req, res) => {
//   try {
//     const user = await User.create({ username: "Cesar", password: "Stick" });
//     console.log("El usuario es: ", user);
//     const note = await Notes.create({ description: "This is an example of one note", title:"This is a title"})
//     user.addNote(note);
//     console.log("This is a note: "+notes)

// } catch (error) {
//     return res.send("el usuario ya esta en uso");
//   }
//   return res.send("usuario creado con exito");
// });

export default app;
