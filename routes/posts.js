const express = require("express"),
  router = express.Router(),
  Post = require("../models").Post,
  auth = require("../config/auth"),
  PostController = require("../controllers/PostController");

//API FOR /posts
//Controller located at ../controllers/PostController
router.post("/", auth.verifyUser, PostController.createPost);
router.get("/all/:userId", PostController.getPostsByUser);
router.get("/all", PostController.getAllPosts);

module.exports = router;
