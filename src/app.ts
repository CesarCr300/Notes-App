import express from "express";

const app = express();
app.set("port", process.env.PORT || 3000);

app.get("/", async (req, res) => {
  res.json("Exito");
});

export default app;
