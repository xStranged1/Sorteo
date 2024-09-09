import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";

export const Seller = sequelize.define('seller', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  }
})