require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST } =
  process.env;
const db = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: "postgres",
});

module.exports = db;
