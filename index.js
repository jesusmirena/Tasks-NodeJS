const express = require("express");
const routes = require("./routes");
const path = require("path");

//Connect the DB
const db = require("./config/db");
require("./models/Proyectos");
db.sync()
  .then(() => console.log("Connected"))
  .catch((error) => console.log("Unable to connect to the database:", error));

const app = express();

//Where to upload the static files
app.use(express.static("public"));

//Enable Pug
app.set("view engine", "pug");

//Add Views folder
app.set("views", path.join(__dirname, "./views"));

app.use(express.urlencoded({ extended: true }));

//Route
app.use("/", routes());

app.listen(3000);