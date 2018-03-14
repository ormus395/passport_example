const express = require("express"),
  cors = require("./config/cors"),
  logger = require("morgan"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  Sequelize = require("sequelize"),
  sqlite = require("sqlite3");

const models = require("./models");

const app = express();
const port = process.env.PORT || 3000;

const users = require("./routes/users");
const posts = require("./routes/posts");
const welcome = require("./routes");

if (!process.env.NODE_ENV) {
  app.use(logger("dev"));
}

app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", users);
app.use("/posts", posts);
app.use("/", welcome);

app.use("*", (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      msg: error.message
    }
  });
});

models.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("server started on " + port);
  });
});
