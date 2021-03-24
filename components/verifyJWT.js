const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.json({ err: "There is no token..." });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.json({ err: "The session has expired." });
      } else {
        req.userId = decoded.u_id;
        next();
      }
    });
  }
};

exports.verifyJWT = verifyJWT;
