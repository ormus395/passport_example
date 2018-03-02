const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../models");
const { ensureAuthenticated } = require("../helpers/auth");

router.post("/", (req, res) => {
  db.User.create({
    username: "theDude",
    password: "12345"
  }).then(user => {
    res.status(200).json({
      msg: "Account created",
      user: user
    });
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users/yay",
    failureRedirect: "/users/ohno"
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.send("logged out");
});

router.get("/yay", (req, res, next) => {
  console.log(req.session);
  res.send(req.session.passport);
});

router.get("/ohno", (req, res) => {
  res.send("DIDNT LOG IN");
});

router.get("/protected", ensureAuthenticated, (req, res) => {
  res.send("Logged in");
});

module.exports = router;
