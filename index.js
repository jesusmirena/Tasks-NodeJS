const express = require("express");
const routes = require("./routes");
const path = require("path");
const flash = require("connect-flash");

//Helpers with some functions
const helpers = require("./helpers");

//Connect the DB
const db = require("./config/db");
//Import models
require("./models/Projects");
require("./models/Tasks");
require("./models/Users");

db.sync()
  .then(() => console.log("Connected"))
  .catch((error) => console.log("Unable to connect to the database:", error));

const app = express();

app.use(express.urlencoded({ extended: true }));

//Where to upload the static files
app.use(express.static("public"));

//Enable Pug
app.set("view engine", "pug");

//Adding flash messages
app.use(flash());

//Passing varDump to the app
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  next();
});

//Add Views folder
app.set("views", path.join(__dirname, "./views"));

//Route
app.use("/", routes());

app.listen(3000);
