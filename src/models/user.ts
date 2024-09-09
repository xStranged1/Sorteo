import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/config";
import { Sorteo } from "./sorteo";

export const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },

})

User.belongsTo(Sorteo, {
  foreignKey: 'id_sorteo'
});