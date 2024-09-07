import { Sequelize } from "sequelize";

require('dotenv').config();
const dialect = process.env.ADDON_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mssql' || 'postgres';
const port = process.env.ADDON_PORT as unknown as number;
export const sequelize = new Sequelize({
  dialect: dialect,
  host: process.env.ADDON_HOST,
  port: port,
  username: process.env.ADDON_USER,
  password: process.env.ADDON_PASSWORD,
  database: process.env.ADDON_DB,
});
