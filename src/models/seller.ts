import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/config";
import { Sorteo } from "./sorteo";

export const Seller = sequelize.define('seller', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  }
})
Seller.belongsTo(Sorteo);