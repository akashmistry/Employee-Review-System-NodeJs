const express = require("express");
const expressLayout = require("express-ejs-layouts");

const app = express();

const PORT = process.env.PORT || 2620;

const path = require("path");

const db = require("./config/mongoose");

// TO PUT AlL ENTERED VALUES IN BODY KEY
app.use(express.urlencoded({ extended: true }));

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");

// REQUIRING MONGO STORE SO THAW WE CAN USE THE EXISTING USER EVEN IF THE SERVER RESTARTS
const MongoStore = require("connect-mongo");

// they are used for showing action notifications
const flash = require("connect-flash");
const flashMiddleWare = require("./config/flashMiddleware");

app.use(express.static(path.join(__dirname, "views")));

app.use(express.static(path.join(__dirname, "assets")));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayout);

// MONGO STORE IS USED HERE TO STORE THE SESSION COOKIE IN THE DB
app.use(
  session({
    name: "ERS",
    secret: "blablabla",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost:27017/employee_review_system",
        autoRemove: "disabled",
      },
      (err) => {
        console.log("connect-mongo: ", err);
      }
    ),
  })
);

//USING PASSPORT
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Using Connect flash
app.use(flash());
app.use(flashMiddleWare.setFlash);

// ROUTING TO INDEX ROUTE
app.use("/", require("./routes/index"));

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error in starting the express server");
    return;
  }
  console.log("Firing up the Express server on ", PORT, "🔥 🤙🏻");
});
