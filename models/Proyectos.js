const Sequelize = require("sequelize");
const db = require("../config/db");
const slug = require("slug");
const { nanoid } = require("nanoid");

const Proyectos = db.define(
  "proyectos",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING,
  },
  {
    hooks: {
      beforeCreate(project) {
        const url = slug(project.nombre).toLowerCase();
        project.url = `${url}-${nanoid()}`;
      },
    },
  }
);

module.exports = Proyectos;
