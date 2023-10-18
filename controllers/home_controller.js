const User = require("../models/user");
const Review = require("../models/review");

// ACTIONS
// FOR FETCHING THE EMPLOYEE AND ITS ASSIGNED WORKS AND REVIEWS
module.exports.home = async function (req, res) {
  try {
    // CHECKING FOR AUTHENTICATION
    if (!req.isAuthenticated()) {
      req.flash("error", "Please LogIn !");

      return res.redirect("/users/sign-in");
    }
    // FETCHING THE USER AND ITS REVIEWS
    let user = await User.findById(req.user.id);
    let review = await Review.find({ reviewer: req.user.id });

    let recipent = [];
    for (let i = 0; i < user.userToReview.length; i++) {
      let userName = await User.findById(user.userToReview[i]);
      recipent.push(userName);
    }
    let reviews = [];
    for (let i = 0; i < review.length; i++) {
      let reviewUser = await User.findById(review[i].reviewed);
      if (reviewUser != null) {
        let currUser = {
          name: reviewUser.name,
          content: review[i].content,
        };
        reviews.push(currUser);
      }
    }

    // RENDERING THE HOME PAGE AND PASSING RECEPIENT AND REVIEW VARIABLES
    return res.render("home", {
      title: "ERS | HOME",
      recipent: recipent,
      reviews: reviews,
      user: user,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
