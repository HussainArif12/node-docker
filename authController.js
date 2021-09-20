const bcrypt = require("bcryptjs");
const User = require("./userModel");
exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashpassword,
    });
    req.session.user = newUser;
    console.log(req.session);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ status: "user not found" });
    }
    const isCorrect = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      req.session.user = user;
      console.log(req.session);
      res.status(200).json({ status: "succcess" });
    } else {
      res.status(400).json({ status: "fail" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
    });
  }
};
