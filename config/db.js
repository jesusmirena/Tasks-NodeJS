require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DATABASE_USER, DATABASE_PASSWORD } = process.env;
const db = new Sequelize("uptasknode", DATABASE_USER, DATABASE_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
