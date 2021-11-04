import { Model, DataTypes } from "sequelize";

import {sequelize} from "../db";

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "El usuario ya esta siendo usado",
        name: "Usuario existente",
      },
    },
    password: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);

export default User;
