const User = require("../models").User;
const auth = require("../config/auth");

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
    console.log("I called bitches");
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

  login: function(req, res) {
    User.findOne({ where: { username: req.body.username } }).then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Login Failed"
        });
      }
      console.log(user.comparePassword);
      user.comparePassword(req.body.password, (err, isMatch) => {
        console.log(req.body.password);
        if (err) {
          console.log(err);
          return next(err);
        }
        if (isMatch) {
          const token = auth.signUser(user);
          res.json({ message: "Logged in", token: token });
        }
      });
    });
  },

  getUserProfile: function(req, res) {
    console.log(req.userData);
    User.find({ where: { id: req.userData.userId } }).then(user => {
      res.status(200).json({
        message: "Profile",
        user: {
          id: user.id,
          username: user.username
        }
      });
    });
  },

  createNewUser: function(req, res, next) {
    console.log(req.body);
    let newUser = {
      username: req.body.username,
      password: req.body.password
    };
    User.create(newUser).then(user => {
      res.status(200).json({
        msg: "Account created",
        user: user
      });
    });
  }
};
