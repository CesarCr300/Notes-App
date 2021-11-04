import express from "express";
import User from "./user/model";
import Notes from "./notes/model";

const app = express();
app.set("port", process.env.PORT || 3000);

app.get("/", async (req, res) => {
  try {
    const user = await User.create({
      id: 1,
      username: "Cesar",
      password: "Stick",
    });
    console.log("El usuario es: ", user);
    await user.createNote({
      description: "This is an example of one note",
      title: "This is a title",
      expectedDate: undefined,
    });
    const data = await Notes.findAll();
    const dataUser = await User.findAll({
      include: [User.associations.notes],
    });
    console.log(data);
    return res.json(dataUser)
  } catch (error) {
    console.log(error);
    return res.send("el usuario ya esta en uso");
  }
  return res.send("usuario creado con exito");
});

export default app;
