const Users = require("../models/user");

// ACTIONS

// FOR ASSIGNING WORK TO USER
module.exports.assignWork = async function (req, res) {
  let employe = await Users.find({});

  return res.render("admin", {
    title: "ERS | Assign Work",
    employe: employe,
  });
};

// FOR SHOWING ALL THE EMPLOYEES
module.exports.showEmployeeList = async function (req, res) {
  if (!req.isAuthenticated()) {
    req.flash("error", "You are not Authorized !");
    return res.redirect("/users/sign-in");
  }
  if (req.user.isAdmin == false) {
    req.flash("error", "You are not Authorized");
    return res.redirect("/");
  }
  let employeList = await Users.find({});

  return res.render("employee", {
    title: "ERS | Employe-List",
    employes: employeList,
  });
};

// FOR SETTING A REVIEW FOR USER
module.exports.setReviewrAndReviewe = async function (req, res) {
  try {
    // FOR CHECKING IF THE REQUEST IS AUTHENTICATED
    if (!req.isAuthenticated()) {
      req.flash("success", "Please Login !");
      return res.redirect("/users/sign-in");
    } else {
      let employee = await Users.findById(req.user.id);

      if (employee.isAdmin == false) {
        req.flash("error", "Opps ! Not Authorized ");
        return res.redirect("/users/sign-in");
      } else if (req.body.sender == req.body.reciver) {
        req.flash("error", "Sender and reciver should not be same !");
        return res.redirect("back");
      }

      //  AFTER CHECKING ALL AUTHENTICATION THE MAIN FUNCTION STARTS FROM HERE
      else {
        let sender = await Users.findById(req.body.sender);
        let reciver = await Users.findById(req.body.reciver);

        sender.userToReview.push(reciver);
        sender.save();
        reciver.reviewRecivedFrom.push(sender);
        reciver.save();

        req.flash("success", "Task Assigned !");
        return res.redirect("back");
      }
    }
  } catch (err) {
    console.log("Errror in setting up the user " + err);
  }
};

// FOR MAKING A USER AS ADMIN
module.exports.newAdmin = async function (req, res) {
  try {
    // CHECK IF USER IS AUTHENTICATED AS ADMIN
    if (!req.isAuthenticated()) {
      console.log("Please LogIn");

      req.flash("success", "Please LogIn !");
      return res.redirect("/users/sign-in");
    }
    // CECKING FOR AUTHORIZATION
    if (req.user.isAdmin == false) {
      req.flash("error", "You are not Admin !");
      return res.redirect("/");
    }
    // MAKING THE USER AS ADMIN
    if (req.user.isAdmin) {
      let user = await Users.findById(req.body.selectedUser);
      if (!user) {
        return res.redirect("back");
      }
      req.flash("success", "New Admin Added");
      user.isAdmin = "true";
      user.save();
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

// FOR DELETING A USER
module.exports.deleteEmployee = async function (req, res) {
  try {
    // CHECKING FOR ADMIN IS AUTHENTICATED
    if (!req.isAuthenticated()) {
      req.flash("error", "Please Login !");
      return res.redirect("users/sign-in");
    }

    if (!req.user.isAdmin) {
      req.flash("error", "You are not admin !");
      return res.redirect("/");
    }

    let employee = await Users.deleteOne({ _id: req.params.id });

    req.flash("success", "User Deleted!");
    return res.redirect("back");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

// FOR SHOWING ADD USER PAGE
module.exports.addEmployee = function (req, res) {
  return res.render("addEmployee", {
    title: "ERS | Add Employee",
  });
};
