const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  bcrypt = require("bcryptjs"),
  User = require("../models").User;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.find({ where: { username: username } })
        .then(user => {
          if (!user) {
            console.log("No USer");
            return done(null, false);
          }
          bcrypt.compare(password, user.password).then(res => {
            if (res) {
              console.log("Match");
              console.log(user);
              return done(null, user);
            } else {
              console.log("no match");
              return done(null, false);
            }
          });
        })
        .catch();
    })
  );

  passport.serializeUser(function(user, done) {
    console.log(user.dataValues.id);
    done(null, user.dataValues.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(user => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => done(err, false));
  });
};
