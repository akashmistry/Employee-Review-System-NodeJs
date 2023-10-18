const express = require("express");

const Router = express.Router();

const homeController = require("../controllers/home_controller");

console.log("Router Loaded!");

// REDIRECTS TO THE HOME PAGE
Router.get("/", homeController.home);

// ALL THE REQUEST WITH /users WILL ROUTE FROM HERE
Router.use("/users", require("./users"));

// ALL THE REQUEST WITH /admin WILL ROUTE FROM HERE
Router.use("/admin", require("./admin"));

// ALL THE REQUEST WITH /reviews WILL ROUTE FROM HERE
Router.use("/reviews", require("./reviews"));

module.exports = Router;
