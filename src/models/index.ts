// models/index.ts
import { sequelize } from "../config/config";
import { Organization } from "./organization";
import { Seller } from "./seller";
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

Sorteo.belongsToMany(User, { through: 'SorteoUser' });
User.belongsToMany(Sorteo, { through: 'SorteoUser' })

Sorteo.belongsToMany(Seller, { through: 'SorteoSeller' });
Seller.belongsToMany(Sorteo, { through: 'SorteoSeller' });

// Export models
export { Organization, Sorteo, User, Seller };