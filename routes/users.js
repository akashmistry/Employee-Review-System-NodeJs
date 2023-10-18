const express = require("express");

const Router = express.Router();

const passport = require("passport");

const userController = require("../controllers/user_controller");

// CNTROLLERS AND ACTIONS
// SIGN UP PAGE
Router.get("/sign-up", userController.signUp);

// SIGN IN PAGE
Router.get("/sign-in", userController.signIn);

// FOR CREATING SESSION FOR THE PERTICULAR USER AND ALSO CHECKS FOR AUTHENTICATION
Router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

// FOR CREATING A NEW USER
Router.post("/create", userController.create);

// FOR LOGING OUT THE CURRENT USER
Router.get("/sign-out", userController.destroySession);

// FOR RENDERING FORGET PASSWORD PAGE
Router.get("/forgetPassword", userController.forgetPasswordPage);

// FOR FORGET PASSWORD FUNCTION
Router.post("/forgetPasswordLink", userController.forgetPasswordLink);

// FOR ADDING A EMPLOYEE BY ADMIN USER
Router.post("/addEmployee", userController.addEmployeee);

// FOR MAKING A USER ADMIN
Router.post("/makeAdmin", userController.makeAdmin);

module.exports = Router;
