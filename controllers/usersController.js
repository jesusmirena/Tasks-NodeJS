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
    console.log("showme the ERROR", error.errors);
    res.render("createAccount", {
      errors: error.errors,
      pageName: "Create UpTask account",
    });
  }
};
