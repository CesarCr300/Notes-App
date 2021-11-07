import io from "socket.io";

import app from "./app";
import db from "../models";
import { seeds } from "../seeders";


db.sequelize.sync({ force: true }).then(async () => {
  
  console.log("DB connected");
  seeds();
  const server = app.listen(app.get("port"), () => {
    console.log("funcionando");
  });
  const serverIo: io.Server = new io.Server(server);
  serverIo.on("connection", (socket)=>{
    socket.on("note:new", function(){
      console.log("new note")
      serverIo.emit("note:new", "Hola")
    })
  })
});
