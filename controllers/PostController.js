const Post = require("../models").Post;
module.exports = {
  createPost: function(req, res) {
    Post.create({ title: req.body.title, UserId: req.user.id }).then(result => {
      res.status(200).json({
        message: "Post create",
        post: result
      });
    });
  },

  getPostsByUser: function(req, res) {
    Post.findAll({ where: { UserId: req.params.userId } }).then(posts => {
      res.status(200).json({
        message: "Found All posts bu user " + req.params.userId,
        posts: posts
      });
    });
  },

  getAllPosts: function(req, res) {
    Post.findAll().then(posts => {
      res.json({
        message: "All posts",
        posts: posts
      });
    });
  }
};
