const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../models");
const auth = require("../config/auth");
const UserController = require("../controllers/UserController");

//API FOR /users
//Controllers at ../controllers/UserController

//Get all users, controller sits in contoller folder, cleaner routing now
router.get("/all", UserController.findAllUsers);

//GET - used for getting user profile, protected route, user must be logged in to access
router.get("/profile", auth.verifyUser, UserController.getUserProfile);
//POST - create user profile
router.post("/new", UserController.createNewUser);
//POST - login user
router.post("/login", UserController.login);
//Log user out
router.get("/logout", (req, res) => {
  req.logOut();
  res.send("logged out");
});

//Get user by id using params in URL
// router.get("/:userId", UserController.getSingleUser);

module.exports = router;
