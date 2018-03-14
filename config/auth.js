const jwt = require("jsonwebtoken");

module.exports = {
  signUser: function(user) {
    const token = jwt.sign(
      { username: user.username, userId: user.id },
      "FUCK",
      {
        expiresIn: "1h"
      }
    );
    return token;
  },

  verifyUser: function(req, res, next) {
    try {
      let token = req.get("Authorization").split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, "FUCK");
      console.log(decoded);
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Auth Failed" });
    }
  }
};
