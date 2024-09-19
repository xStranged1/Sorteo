import { sequelize } from "../config/config";
import { DataTypes } from "sequelize";

export const Sorteo = sequelize.define("sorteo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  numberCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  availableNumbers: {
    type: DataTypes.INTEGER,
  },
  dateStart: {
    type: DataTypes.DATEONLY,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    validate: {
      max: 1500
    }
  }
},
  {
    hooks: {
      beforeCreate: (sorteo: any) => {
        sorteo.availableNumbers = sorteo.numberCount;
      }
    }
  }
);