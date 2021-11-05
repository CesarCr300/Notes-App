import express from "express";

import db from '../models'

const app = express();
app.set("port", process.env.PORT || 3000);

app.get("/", async (req, res) => {
  const data = await db.User.findAll({include:db.Note})
  res.json(data);
});

export default app;
