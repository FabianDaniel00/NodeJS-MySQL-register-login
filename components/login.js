const bcrypt = require("bcrypt");
require("dotenv").config();

const login = (app, pool) => {
  app.post("/login", (req, res) => {
    const { u_name, u_password } = req.body;

    if (!u_name || !u_password) {
      return res.json({ err: "Can not be empty data!" });
    }

    const LOGIN = "SELECT * FROM users WHERE u_name = ?";

    pool.query(LOGIN, u_name, (err, result) => {
      if (err) {
        console.log(err.message);
        res.json({ err: "Something went wrong during login..." });
      } else if (result.length === 0) {
        res.json({ err: "This user in not exist!" });
      } else {
        bcrypt.compare(
          u_password,
          result[0].u_password,
          (err_match, password_match) => {
            if (err_match) {
              console.log(err_match.message);
              res.json({ err: "Something went wrong during login..." });
            } else if (password_match) {
              req.session.user = result[0];
              console.log(`Successful login, username: ${u_name}`);
              res.send();
            } else {
              res.json({ err: "Wrong username/password combination!" });
            }
          }
        );
      }
    });
  });
};

exports.login = login;
