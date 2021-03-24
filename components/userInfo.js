const userInfo = (app, verifyJWT) => {
  app.get("/user-info", verifyJWT, (req, res) => {
    const user = req.session.user;
    if (user) {
      if (user.u_id === req.userId) {
        res.json({ user: req.session.user });
      } else {
        res.json({ err: "Something went wrong during authentication." });
      }
    } else {
      res.json({ err: "No user is logged." });
    }
  });
};

exports.userInfo = userInfo;
