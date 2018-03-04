const express = require("express");
const router = express.Router();

router.get("/welcome", (req, res) => {
  res.status(200).json({
    message: "Hello there"
  });
});

router.get("/test", (req, res) => {
  console.log(req.headers);
});

module.exports = router;
