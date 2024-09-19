import { DataTypes } from "sequelize";
import { sequelize } from "../config/config";

export const Organization = sequelize.define('organization', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        validate: {
            max: 1500,
        }
    }
})
