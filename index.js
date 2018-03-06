const express = require("express"),
  cors = require("./config/cors"),
  logger = require("morgan"),
  session = require("cookie-session"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
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
app.use(cookieParser());

app.use(
  session({
    secret: "fnwangoawrbvoaernbmainepb"
  })
);

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", users);
app.use("/posts", posts);
app.use("/", welcome);

models.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("server started on " + port);
  });
});
