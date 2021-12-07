const Sequelize = require("sequelize");
const db = require("../config/db");
const Projects = require("./Projects");

const Tasks = db.define("tasks", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tasks: Sequelize.STRING(100),
  status: Sequelize.INTEGER,
});
Tasks.belongsTo(Projects);

module.exports = Tasks;
