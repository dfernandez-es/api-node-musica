const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User / Password are not correct",
      });
    }

    if (!user.state) {
      return res.status(400).json({
        msg: "User / Password are not correct",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "User / Password are not correct",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Contact the administrator",
    });
  }
};

module.exports = { login };
