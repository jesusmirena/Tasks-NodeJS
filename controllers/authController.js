const passport = require("passport");
const Users = require("../models/Users");
const crypto = require("crypto");

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
    res.redirect("/reset-password");
  }
  user.token = crypto.randomBytes(20).toString("hex");
  user.expiration = Date.now() + 3600000;

  await user.save();

  const resetUrl = `http://${req.headers.host}/reset-password/${user.token}`;
  console.log(resetUrl);
};

exports.resetPassword = async (req, res) => {
  res.json(req.params.token);
};
