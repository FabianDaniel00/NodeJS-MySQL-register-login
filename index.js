const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { pool } = require("./db-config.js");
const { register } = require("./components/register.js");
const { login } = require("./components/login.js");
const {
  checkUserIsAuthenticated,
} = require("./components/checkUserIsAuthenticated.js");
const { logout } = require("./components/logout.js");
const { verifyJWT } = require("./components/verifyJWT.js");
const { userInfo } = require("./components/userInfo.js");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_HOST,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: "user",
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24, //one day in milliseconds
    },
  })
);

pool.getConnection((err) => {
  if (err) {
    return console.log(err);
  }
});

app.get("/", (req, res) => {
  res.send("Hi from the API...");
});

register(app, pool);
login(app, pool);
checkUserIsAuthenticated(app);
userInfo(app, verifyJWT);
logout(app, verifyJWT);

app.listen(process.env.API_PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`API is listening on port ${process.env.API_PORT}...`);
  }
});
