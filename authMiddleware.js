const protect = (req, res, next) => {
  const { user } = req.session;
  console.log(req.session);
  if (!user) {
    return res.json({ message: "not logged in" });
  }
  req.user = user;
  next();
};

module.exports = protect;
