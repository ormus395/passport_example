const express = require("express");
const router = express.Router();
const db = require("../models");

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

module.exports = router;
