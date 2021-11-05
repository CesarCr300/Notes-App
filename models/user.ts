"use strict";
import { Model, DataTypes } from "sequelize";

interface IUserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<IUserAttributes> implements IUserAttributes {
    id!: number;
    username!: string;
    password!: string;
    email!: string;
    static associate(models: any) {
      User.belongsToMany(models.Note, {
        through: "User_Notes"
      })
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
