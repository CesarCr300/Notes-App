import { Request, Response } from "express";

import db from "../../models";

export const getNotes = async (req: Request, res: Response) => {
  try {
    let data = await db.Note.findAll();
    res.render("./notes/index.ejs", { data });
  } catch (err) {
    console.log(err);
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const data = await db.Note.findByPk(req.params.id);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const createNote = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const data = await db.Note.create({ title, description });
  res.json(data);
};

export const destroyNote = async (req: Request, res: Response) => {
  let data;
  try {
    data = await db.Note.findByPk(req.params.id);
    await data.destroy();
  } catch (err) {
    console.log(err);
  }
  res.json(data);
};

export const updateNote = async (req: Request, res: Response) => {
  let data;
  try {
    const { title, description, id } = req.body;
    data = await db.Note.findByPk(id);
    data.set({ title, description });
    await data.save();
  } catch (err) {
    console.log(err);
  }
  res.json(data);
};
