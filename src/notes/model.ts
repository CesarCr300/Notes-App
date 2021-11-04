import { Model, DataTypes, Optional } from "sequelize";

import { sequelize } from "../db";

interface INotesAtributes {
  id: number;
  title: string | undefined;
  description: string | undefined;
  expectedDate: Date | undefined;
  UserId: number | undefined;
}

interface INotes extends Optional<INotesAtributes, "id"> {}

class Notes extends Model<INotesAtributes, INotes> implements INotesAtributes {
  public id!: number;
  public title: string | undefined;
  public description: string | undefined;
  public expectedDate: Date | undefined;
  public UserId : number | undefined;
}

Notes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  { sequelize, modelName: "note" }
);

export default Notes;
