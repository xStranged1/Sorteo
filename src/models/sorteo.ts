import { sequelize } from "../config/config";
import { DataTypes } from "sequelize";

export const Sorteo = sequelize.define("sorteo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  dateStart: {
    type: DataTypes.DATEONLY,
  },
  name: DataTypes.STRING,
});