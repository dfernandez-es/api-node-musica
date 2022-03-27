const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/User");

const userGet = async (req = request, res = response) => {
  const { limit = 5, start = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(start)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const userPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  await user.save();
  res.json({
    usuario: user,
  });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, correo, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const userDelete = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json(user);
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
