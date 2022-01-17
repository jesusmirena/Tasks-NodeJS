const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//Reference to the model where we will authenticate
const Users = require("../models/Users");

//Local Strategy with username and password
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({
          where: { email, active: 1 },
        });
        if (!user.verifyPassword(password)) {
          return done(null, false, {
            message: "Password isn't correct",
          });
        }
        return done(null, user);
      } catch (error) {
        return done(null, false, {
          message: "This account doesn't exist",
        });
      }
    }
  )
);

//serialize and deserialize user
passport.serializeUser((user, callback) => {
  callback(null, user);
});
passport.deserializeUser((user, callback) => {
  callback(null, user);
});

module.exports = passport;
