const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(user.password, salt);
          user.password = hash;
        }
      }
    }
  );

  User.associate = function(models) {
    models.User.hasMany(models.Post);
  };

  User.prototype.comparePassword = function(password, cb) {
    const user = this;
    bcrypt.compare(password, user.password, function(err, isMatch) {
      console.log(user.password);
      if (!isMatch) {
        console.log("No macyh");
        return cb(err, false);
      } else {
        console.log("Match");
        return cb(null, isMatch);
      }
    });
  };

  return User;
};
