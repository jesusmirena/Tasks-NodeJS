const express = require("express");
const routes = require("./routes");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");

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

//Where to upload the static files
app.use(express.static("public"));

//Enable Pug
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));

//Adding flash messages
app.use(flash());

//Sessions let us navigate through the page without authenticating again
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Passing varDump to the app
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.messages = req.flash();
  res.locals.user = { ...req.user } || null;
  next();
});

//Add Views folder
app.set("views", path.join(__dirname, "./views"));

//Route
app.use("/", routes());

app.listen(3000);
