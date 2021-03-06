const passport = require("passport");
const Users = require("../models/Users");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const sendEmail = require("../handlers/email");

exports.authenticateUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});

exports.userAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

exports.sendToken = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    req.flash("error", "This account doesn't exist");
    res.redirect("/reset");
  }
  user.token = crypto.randomBytes(20).toString("hex");
  user.expiration = Date.now() + 3600000;

  await user.save();

  const resetUrl = `http://${req.headers.host}/reset/${user.token}`;
  //Sending email with the token
  await sendEmail.send({
    user,
    subject: "Password Reset",
    resetUrl,
    file: "reset-password",
  });

  req.flash("correcto", "We have sent a message to your email");
  res.redirect("/login");
};

exports.validateToken = async (req, res) => {
  const user = await Users.findOne({ where: { token: req.params.token } });

  if (!user) {
    req.flash("error", "invalid");
    res.redirect("/reset");
  }

  //Form to generate password
  res.render("resetPassword", {
    pageName: "Reset your password",
  });
};

exports.updatePassword = async (req, res) => {
  const user = await Users.findOne({
    where: {
      token: req.params.token,
      expiration: {
        [Op.gte]: Date.now(),
      },
    },
  });

  if (!user) {
    res.flash("error", "invalid");
    res.redirect("/reset");
  }
  user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  user.token = null;
  user.expiration = null;

  await user.save();

  req.flash("correcto", "Your password has been updated successfully");
  res.redirect("/login");
};
