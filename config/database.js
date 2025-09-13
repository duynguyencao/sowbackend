import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
// console.log('DB from .env =>', process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME, process.env.DB_USER);
const sequelize = new Sequelize(
  process.env.DB_NAME || 'sow',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD ,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export { sequelize };

