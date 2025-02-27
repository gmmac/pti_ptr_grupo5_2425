require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_DEV_USERNAME,
    password: process.env.DATABASE_DEV_PASSW0RD,
    database: process.env.DATABASE_DEV_DATABASE,
    host: process.env.DATABASE_DEV_HOST,
    dialect: 'postgres'
  }
};