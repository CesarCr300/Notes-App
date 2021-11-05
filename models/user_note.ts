"use strict";
import { Model } from "sequelize";

interface IUser_NoteAttributes {
  NoteId: number;
  UserId: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User_Note
    extends Model<IUser_NoteAttributes>
    implements IUser_NoteAttributes
  {
    public NoteId!: number;
    public UserId!: number;
    static associate(models: any) {}
  }
  User_Note.init(
    {
      NoteId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        references: {
          model: "Notes",
          key:"id"
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        references: {
          model: "Users",
          key:"id"
        }
      },
    },
    {
      sequelize,
      modelName: "User_Note",
    }
  );
  return User_Note;
};
