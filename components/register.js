const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const register = (app, pool) => {
  app.post("/register", (req, res) => {
    const { u_name, u_password, u_email } = req.body;

    if (!u_name || !u_password || !u_email) {
      return res.json({ err: "Can not be empty data!" });
    }

    const CHECK_USER_IS_EXIST = `SELECT * FROM users WHERE u_name = ? OR u_email = ?`;

    pool.query(
      CHECK_USER_IS_EXIST,
      [u_name, u_email],
      (err_check, result_check) => {
        if (err_check) {
          console.log(err_check.message);
          res.json({ err: "Something went wrong during registration..." });
        } else if (result_check.length === 0) {
          bcrypt.hash(u_password, 10, (err, hash) => {
            if (err) {
              console.log(err.message);
              res.json({ err: "Something went wrong during registration..." });
            } else {
              const REGISTER =
                "INSERT INTO users (u_id, u_name, u_password, u_email, u_right) VALUES (?, ?, ?, ?, ?)";

              pool.query(
                REGISTER,
                [uuidv4(), u_name, hash, u_email, 0],
                (err, result) => {
                  if (err) {
                    console.log(err.message);
                    res.json({
                      err: "Something went wrong during registration...",
                    });
                  } else if (result.affectedRows === 0) {
                    console.log(result.message);
                    res.json({
                      err: "Something went wrong during registration...",
                    });
                  } else {
                    console.log(
                      `Registration was successful, username: ${u_name}, email: ${u_email}`
                    );
                    res.json({
                      message: `Registration was successful, username: ${u_name}, email: ${u_email}`,
                    });
                  }
                }
              );
            }
          });
        } else {
          res.json({ err: "This username or e-mail is exist." });
        }
      }
    );
  });
};

exports.register = register;
