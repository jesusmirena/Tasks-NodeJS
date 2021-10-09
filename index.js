const express = require("express");
const routes = require("./routes");
const path = require("path");

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
