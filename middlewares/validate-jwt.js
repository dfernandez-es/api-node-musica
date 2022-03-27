const { response, request } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There is no token in the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATEKEY);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Invalid token",
      });
    }

    if (!user.state) {
      return res.status(401).json({
        msg: "Invalid token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = validateJWT;
