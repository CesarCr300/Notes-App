"use strict";
import { Model, DataTypes } from "sequelize";

interface INoteAttributes {
  id: number;
  title: string;
  description: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Note extends Model<INoteAttributes> implements INoteAttributes {
    id!: number;
    title!: string;
    description!: string;
    static associate(models: any) {
      Note.belongsToMany(models.User, {
        through: "User_Notes"
      })
    }
  }
  Note.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
