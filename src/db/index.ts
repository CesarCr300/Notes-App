import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("passport", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// function asociations() {
//   UserToNotes;
// }

import Notes from "../notes/model";
import User from "../user/model";
// import UserToNotes from "./asociations/userToNotes";

const models = [Notes, User]

function initilizationTables():void {
  Notes;
  User;
}

export default async function connectDB() {
  initilizationTables();
  // asociations();
  await sequelize.sync({force: true});
  console.log("La base de datos se conecto")
}


