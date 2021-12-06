const Users = require("../models/Users");

exports.createAccountForm = (req, res) => {
  res.render("createAccount", {
    pageName: "Create UpTask account",
  });
};

exports.createAccount = (req, res) => {
  //Read data
  const { email, password } = req.body;

  //Creating the user
  Users.create({
    email,
    password,
  }).then(() => {
    res.redirect("./login");
  });
};
