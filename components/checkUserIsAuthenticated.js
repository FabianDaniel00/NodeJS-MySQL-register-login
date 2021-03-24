const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkUserIsAuthenticated = (app) => {
  app.get("/auth", (req, res) => {
    const user = req.session.user;

    if (user) {
      const u_id = user.u_id;
      const token = jwt.sign({ u_id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({ user: user, token: token });
    } else {
      res.json({ user: "" });
    }
  });
};

exports.checkUserIsAuthenticated = checkUserIsAuthenticated;
