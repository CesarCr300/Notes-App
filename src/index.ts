import db from "../models";
import app from "./app";

db.sequelize.sync({ force: true }).then(() => {
  console.log("DB connected");
  app.listen(app.get("port"), () => {
    console.log("funcionando");
  });
});
