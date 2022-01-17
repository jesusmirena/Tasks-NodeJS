const Users = require("../models/Users");
const sendEmail = require("../handlers/email");

exports.createAccountForm = (req, res) => {
  res.render("createAccount", {
    pageName: "Create UpTask account",
  });
};
exports.loginForm = (req, res) => {
  const { error } = res.locals.messages;
  res.render("login", {
    pageName: "Log in to UpTask",
    error,
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

    const confirmUrl = `http://${req.headers.host}/confirm/${email}`;

    const user = {
      email,
    };

    await sendEmail.send({
      user,
      subject: "Confirm account",
      confirmUrl,
      file: "confirm-account",
    });
    req.flash(
      "correcto",
      "We have sent a message to your email, confirm your account"
    );
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

exports.resetPasswordForm = (req, res) => {
  res.render("reset", {
    pageName: "Reset your Password",
  });
};

//Changes the account status
exports.confirmAccount = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.params.email,
    },
  });
  if (!user) {
    req.flash("error", "invalid");
    res.redirect("/create-account");
  }
  user.active = 1;
  await user.save();

  req.flash("correcto", "Your account has been activated");
  res.redirect("/login");
};
