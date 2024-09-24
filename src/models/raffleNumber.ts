import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";
import { msgNumberAlreadySelled } from "../errors/errorMessage";

export const RaffleNumber = sequelize.define('raffleNumber', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
    validate: {
      min: 0,
    }
  }
},
  {
    hooks: {
      beforeCreate: async (raffleNumber: any) => {
        const numberSelled = await RaffleNumber.findOne({ where: { sorteoId: raffleNumber.sorteoId, number: raffleNumber.number } })
        if (numberSelled) throw new Error(msgNumberAlreadySelled);
      }
    }
  }
)