import app from "./app";
import db from "../models";
import { seeds } from "../seeders";

db.sequelize.sync({ force: true }).then(async () => {
  console.log("DB connected");
  seeds()
  app.listen(app.get("port"), () => {
    console.log("funcionando");
  });
});
