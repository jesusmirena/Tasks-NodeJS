const passport = require("passport");

exports.authenticateUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});
