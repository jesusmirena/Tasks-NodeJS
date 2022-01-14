const Sequelize = require("sequelize");
const db = require("../config/db");
const Projects = require("./Projects");
const bcrypt = require("bcrypt");

const Users = db.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Add a valid email",
        },
        notEmpty: {
          msg: "Email can't be empty",
        },
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password can't be empty",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      },
    },
  }
);

//Customized Methods
Users.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

Users.hasMany(Projects);

module.exports = Users;
