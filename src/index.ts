import connectionDB from "./db";
import app from "./app";

connectionDB();

app.listen(app.get("port"), () => {
  console.log("funcionando");
});
