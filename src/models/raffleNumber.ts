import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";
import { Sorteo } from "./sorteo";

export const RaffleNumber = sequelize.define('raffleNumber', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    }
  }
},
)