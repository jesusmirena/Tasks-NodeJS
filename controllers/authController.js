const passport = require("passport");
const Users = require("../models/Users");

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
    res.render("reset", {
      pageName: "Reset your Password",
      messages: req.flash(),
    });
  }
};
