const express = require("express"),
  router = express.Router(),
  { ensureAuthenticated } = require("../helpers/auth"),
  Post = require("../models").Post,
  PostController = require("../controllers/PostController");

//API FOR /posts
//Controller located at ../controllers/PostController
router.post("/", ensureAuthenticated, PostController.createPost);
router.get("/all/:userId", PostController.getPostsByUser);
router.get("/all", PostController.getAllPosts);

module.exports = router;
