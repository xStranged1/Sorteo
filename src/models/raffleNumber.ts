import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";
import { msgNumberAlreadySelled, msgNumberHigher, msgServerError } from "../errors/errorMessage";
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
    unique: false,
    validate: {
      min: 0,
    }
  }
},
  {
    hooks: {
      beforeCreate: async (raffleNumber: any) => {

        async function validateNumber() {
          // console.log("raffleNumber INPUT");
          // console.log(raffleNumber);

          const results = await Promise.allSettled([
            RaffleNumber.findOne({ where: { sorteoId: raffleNumber.sorteoId, number: raffleNumber.number } }),
            Sorteo.findOne({ attributes: ['numberCount'], where: { id: raffleNumber.sorteoId } }),
          ]);

          results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
              if (result.value) {
                if (index == 0) {
                  // console.log('FIND value');
                  // console.log(`Companies of Type ${String.fromCharCode(65 + index)}:`, result.value);
                  throw new Error(msgNumberAlreadySelled);
                }
                if (index == 1) {
                  // console.log('FIND numberCount');
                  // console.log(`Companies of Type ${String.fromCharCode(65 + index)}:`, result.value);
                  const numberCount = result.value.dataValues.numberCount
                  // console.log("numberCount");
                  // console.log(numberCount);
                  // console.log("raffleNumber.number");
                  // console.log(raffleNumber.number);
                  if (raffleNumber.number > numberCount) throw new Error(msgNumberHigher);
                }
              }
            } else {
              // console.error(`Error fetching Type ${String.fromCharCode(65 + index)}:`, result.reason);
              throw new Error(msgServerError);
            }
          });
        }

        await validateNumber();

      }
    }
  }
)