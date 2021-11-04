import { Model, DataTypes } from "sequelize";

import { sequelize } from "../db";

class Notes extends Model {}

Notes.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expectedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, modelName: "note" }
);

export default Notes;
