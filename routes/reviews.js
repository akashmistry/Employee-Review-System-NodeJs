const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/review_controller");

// CONTROLLERS
// FOR SETTING UP A REVIEW
router.get("/newReview/:id", reviewController.newReview);

module.exports = router;
