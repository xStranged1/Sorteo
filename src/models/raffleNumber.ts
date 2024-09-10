import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";

export const RaffleNumber = sequelize.define('raffleNumber', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
})