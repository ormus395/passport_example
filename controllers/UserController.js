const User = require("../models").User;

module.exports = {
  findAllUsers: function(req, res) {
    User.findAll().then(users => {
      let response = users.map(user => {
        return {
          id: user.id,
          username: user.username,
          singleDetails: {
            type: "GET",
            url: `http://localhost:3000/users/${user.id}`
          }
        };
      });
      res.json({
        message: "All requested users",
        users: response
      });
    });
  },

  getSingleUser: function(req, res) {
    User.findById(req.params.userId).then(user => {
      let response = {
        username: user.username
      };
      res.status(200).json({
        message: "Single user",
        user: response
      });
    });
  },

  getUserProfile: function(req, res) {
    User.find({ where: { id: req.user.id } }).then(user => {
      res.status(200).json({
        message: "Profile",
        user: {
          id: user.id,
          username: user.username
        }
      });
    });
  },

  createNewUser: function(req, res) {
    User.create({
      username: "theDude",
      password: "12345"
    }).then(user => {
      res.status(200).json({
        msg: "Account created",
        user: user
      });
    });
  }
};
