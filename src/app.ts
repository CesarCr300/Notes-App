import express from "express";
import path from "path";

import db from "../models";

import { router as notesRouter } from "./notes/routes";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/notes", notesRouter);

export default app;
