const logout = (app, verifyJWT) => {
  app.post("/logout", verifyJWT, (req, res) => {
    const user = req.session.user;
    if (user) {
      if (user.u_id === req.userId) {
        const username = user.u_name;
        res.clearCookie("user");
        console.log(`Successfully logged out, username: ${username}`);
        res.send();
      } else {
        res.json({ err: "Something went wrong during authentication." });
      }
    } else {
      res.json({ err: "There is no user logged in." });
    }
  });
};

exports.logout = logout;
