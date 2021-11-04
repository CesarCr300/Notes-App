import {
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from "sequelize";

import { sequelize } from "../db";
import Notes from "../notes/model";

interface IUserAttributes {
  id: number;
  username: string;
  password: string;
}

interface IUser extends Optional<IUserAttributes, "id"> {}

class User extends Model<IUserAttributes, IUser> implements IUserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  public getNotes!: HasManyGetAssociationsMixin<Notes>;
  public addNotes!: HasManyAddAssociationMixin<Notes, number>;
  public hasNote!: HasManyHasAssociationMixin<Notes, number>;
  public countNotes!: HasManyCountAssociationsMixin;
  public createNote!: HasManyCreateAssociationMixin<Notes>;

  public readonly notes?: Notes[];
  public static associations: {
    notes: Association<User, Notes>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize, tableName: "users" }
);

User.hasMany(Notes, {as:"notes"})
Notes.belongsTo(User)

export default User;
