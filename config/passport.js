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
        const user = await Users.find({
          where: { email: email },
        });
        if (!user.verifyPassword(password)) {
        }
      } catch (error) {
        return done(null, false, {
          message: "This account doesn't exist",
        });
      }
    }
  )
);
