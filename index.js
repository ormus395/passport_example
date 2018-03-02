const express = require("express"),
  bodyParser = require("body-parser"),
  Sequelize = require("sequelize"),
  sqlite = require("sqlite3");

const models = require("./models");

const app = express();
const port = process.env.PORT || 3000;

const users = require("./routes/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", users);

models.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("server started on " + port);
  });
});
