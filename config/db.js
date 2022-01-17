require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, HOST } = process.env;
const db = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: HOST,
  dialect: "postgres",
});

module.exports = db;
