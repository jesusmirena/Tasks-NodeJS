const Sequelize = require("sequelize");
const db = require("../config/db");
const slug = require("slug");
const { nanoid } = require("nanoid");

const Projects = db.define(
  "projects",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    url: Sequelize.STRING,
  },
  {
    hooks: {
      beforeCreate(project) {
        const url = slug(project.name).toLowerCase();
        project.url = `${url}-${nanoid()}`;
      },
    },
  }
);

module.exports = Projects;
