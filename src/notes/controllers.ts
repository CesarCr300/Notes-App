import { Request, Response } from "express";

import db from "../../models";

export const getNotes = async (req: Request, res: Response) => {
  try {
    let data = await db.Note.findAll();
    res.render("./notes/index.ejs", { data });
  } catch (err) {
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

export const createNote = async (title:string, description:string) => {
  const data = await db.Note.create({ title, description });
  return data;
};

export const destroyNote = async(id:number) => {
  let data;
  try {
    data = await db.Note.findByPk(id);
    await data.destroy();
  } catch (err) {
    console.log(err);
  }
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
