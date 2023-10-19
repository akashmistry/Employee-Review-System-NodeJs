const User = require("../models/user");

// ACTIONS
// ACTION FOR RENDERING THE SIGN IN PAGE
module.exports.signIn = (req, res) => {
  return res.render("sign-in", {
    title: "ERS | Sign In",
  });
};

// ACTION FOR RENDERING THE SIGN UP PAGE
module.exports.signUp = (req, res) => {
  return res.render("sign-up", {
    title: "ERS | Sign Up",
  });
};

// ACTION FOR CREATING SESSION FOR USER
module.exports.createSession = (req, res) => {
  req.flash("success", "You are logged In");
  return res.redirect("/");
};

// ACTION FOR CREATEING A NEW USER WHILE SIGNING UP
module.exports.create = async (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    req.flash("error", "Password should be equal to Confirm Password");

    return res.redirect("back");
  }

  const user = await User.findOne({ email: req.body.email });

  //   IF USER HAS ALREADY REGISTERED
  if (!user) {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: false,
    });
    return res.redirect("/users/sign-in");
  }
  return res.redirect("back");
};

// ACTION FOR LOGGING OUT
module.exports.destroySession = (req, res, done) => {
  return req.logout((err) => {
    if (err) {
      return done(err);
    }

    return res.redirect("/users/sign-in");
  });
};

// FORGET PASSWORD ACTIONS

// FOR RENDERING FORGET PASSWORD PAGE
module.exports.forgetPasswordPage = function (req, res) {
  return res.render("forget_password", {
    title: "Forget Password",
  });
};

// FOR UPDATING THE PASSWORD WITH THE NEW ONE
module.exports.forgetPasswordLink = async function (req, res) {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.redirect("/users/signUp");
  }
  if (req.body.password == req.body.confirmPassword) {
    req.flash("success", "Password Changed :)");
    user.password = req.body.password;
    await user.updateOne({ password: req.body.password });
    return res.redirect("/users/sign-in");
  }
  return res.redirect("back");
};

// FOR ADDING NEW EMPLOYEES BY ADMIN
// SAME AS SIGN UP
module.exports.addEmployeee = async function (req, res) {
  if (req.body.password != req.body.confirmPassword) {
    req.flash("error", "Password should be equal to Confirm Password");
    return res.redirect("back");
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: false,
    });

    return res.redirect("/admin/view-employee");
  }
  return res.redirect("back");
};

// FOR MAKING NEW ADMIN, ONLY ACCESSIBLE TO ADMIN
module.exports.makeAdmin = async function (req, res) {
  try {
    if (req.body.admin_password == "admin") {
      let user = await User.findById(req.user.id);
      user.isAdmin = true;
      user.save();
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};
