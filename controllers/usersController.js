const Users = require("../models/Users");

exports.createAccountForm = (req, res) => {
  res.render("createAccount", {
    pageName: "Create UpTask account",
  });
};

exports.createAccount = async (req, res) => {
  //Read data
  const { email, password } = req.body;

  try {
    //Creating the user
    await Users.create({
      email,
      password,
    });
    res.redirect("./login");
  } catch (error) {
    req.flash(
      "error",
      error.errors.map((error) => error.message)
    );
    res.render("createAccount", {
      messages: req.flash(),
      pageName: "Create UpTask account",
      email,
      password,
    });
  }
};
