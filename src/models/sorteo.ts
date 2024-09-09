import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/config";

const User = sequelize.define(
  "user",
  { name: DataTypes.STRING },
  { timestamps: false }
);
// const User = sequelize.define('user', { id: {type: DataTypes.INTEGER ,autoIncrement: true} }, { name: DataTypes.STRING }, );

export const Sorteo = sequelize.define("sorteo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
});

Sorteo.hasMany(User);
