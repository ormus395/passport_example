const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../models");
const { ensureAuthenticated } = require("../helpers/auth");
const UserController = require("../controllers/UserController");

//API FOR /users
//Controllers at ../controllers/UserController

//Get all users, controller sits in contoller folder, clearner routing now
router.get("/all", UserController.findAllUsers);
//Get user by id using params in URL
router.get("/:userId", UserController.getSingleUser);
//GET - used for getting user profile, protected route, user must be logged in to access
router.get("/profile", ensureAuthenticated, UserController.getUserProfile);
//POST - create user profile
router.post("/new", UserController.createNewUser);
//POST - login user
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "users/profile",
    failureRedirect: "/users/login"
  })(req, res, next);
});
//Log user out
router.get("/logout", (req, res) => {
  req.logOut();
  res.send("logged out");
});

module.exports = router;
