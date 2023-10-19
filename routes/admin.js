const express = require("express");

const router = express.Router();

const passport = require("passport");

const adminController = require("../controllers/admin_controller");

// CONTROLLERS AND ACTIONS
// FOR ASSIGNING WORK TO SOME USER
router.get(
  "/assignWork",
  passport.checkAuthentication,
  adminController.assignWork
);

// FOR VIEWING ALL THE USERS
router.get(
  "/view-employee",
  passport.checkAuthentication,
  adminController.showEmployeeList
);

// FOR SETTING REVIEWS USER
router.post(
  "/setReviewes",
  passport.checkAuthentication,
  adminController.setReviewrAndReviewe
);

// FOR MAKING A USER AS ADMIN
router.post(
  "/newAdmin",
  passport.checkAuthentication,
  adminController.newAdmin
);

// FOR DELETING A USER
router.get(
  "/deleteEmployee/:id",
  passport.checkAuthentication,
  adminController.deleteEmployee
);

// FOR ADDING NEW USER
router.get(
  "/add-employee",
  passport.checkAuthentication,
  adminController.addEmployee
);

module.exports = router;
