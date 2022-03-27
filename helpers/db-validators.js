const Role = require("../models/Role");
const User = require("../models/User");

const isValidRole = async (role = "") => {
  const isValidRole = await Role.findOne({ role });
  if (!isValidRole) {
    throw new Error(`The role ${role} is not registered in the database`);
  }
};

const emailExists = async (email = "") => {
  // Verificar si el correo existe
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`The email: ${email}, is already registered`);
  }
};

const existsUserById = async (id) => {
  // Verificar si el correo existe
  const existsUserById = await User.findById(id);
  if (!existsUserById) {
    throw new Error(`The ${id} id does not exist `);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  existsUserById,
};
