// models/index.ts
import { sequelize } from "../config/config";
import { Organization } from "./organization";
import { Sorteo } from "./sorteo";
import { User } from "./user";

// Define associations here
Organization.hasMany(Sorteo,
    {
        foreignKey: {
            name: 'organizationId',
            allowNull: false
        }
    });

Sorteo.belongsTo(Organization); // This creates the `organizationId` foreign key in Sorteo.
Sorteo.hasMany(User, { foreignKey: 'sorteoId' });
User.belongsTo(Sorteo);

// Export models
export { Organization, Sorteo, User };