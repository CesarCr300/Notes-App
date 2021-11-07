import { Router, Request, Response } from "express";
import {
  createNote,
  destroyNote,
  getNote,
  getNotes,
  updateNote,
} from "./controllers";

export const router = Router();

router.route("/").get(getNotes).post(createNote);

router.route("/:id").get(getNote).delete(destroyNote).put(updateNote);

router.get("/", getNotes);
