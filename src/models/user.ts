import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/config";
import { Sorteo } from "./sorteo";

export const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.INTEGER,
  },
})