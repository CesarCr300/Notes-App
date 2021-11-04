import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("passport", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

function asociations() {
  UserToNotes;
}

import User from "../user/model";
import Notes from "../notes/model";
import UserToNotes from "./asociations/userToNotes";

function initilizationTables() {
  Notes;
  User;
}

export default async function connectDB() {
  initilizationTables();
  asociations();
  await sequelize.sync({force: false});
  console.log("La base de datos se conecto")
}


