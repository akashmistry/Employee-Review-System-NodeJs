const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// AUTHENTICATION USING PASSPORT
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // FIND THE USER AND ESTABLISH IDENTITY
      const user = await User.findOne({ email: email });

      if (!user || password != user.password) {
        console.log("Invalid Username/Password");
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

// SERIALIZING USER TO DECIDE WHICH KEY IS TO BE KEPT IN THE COOKIES
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// DESERIALIZING THE USER FROM THE KEY IN THE COOKIES
passport.deserializeUser(async (id, done) => {
  const userId = await User.findById(id);

  if (!userId) {
    console.log("Error in config/ passport-locals");
    return;
  }
  return done(null, userId);
});

// CHECKING AUTHENTICATION
passport.checkAuthentication = (req, res, next) => {
  // IF THE USER IS AUTHENTICATED THEN PASS ON THE REQ TO NEXT MIDDLEWARE FUNCTON WHICH IS CONTROLLER'S ACTION
  if (req.isAuthenticated()) {
    return next();
  }
  //   IF USER IS NOT SIGNED IN THEN SEND USER TO SIGN IN PAGE
  return res.redirect("/users/sign-in");
};

// SETTING AUTHENTICATION
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    // CURRENT USER DATA IS STORED IN THE REQ SO WE ARE JUST STORING IT'S DATA TO RES
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
