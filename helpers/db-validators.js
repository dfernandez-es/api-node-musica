const Role = require("../models/Role");
const User = require("../models/User");

const isValidRole = async (role = "") => {
  const isValidRole = await Role.findOne({ role });
  if (!isValidRole) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

const emailExists = async (email = "") => {
  // Verificar si el correo existe
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }
};

const existsUserById = async (id) => {
  // Verificar si el correo existe
  const existsUserById = await User.findById(id);
  if (!existsUserById) {
    throw new Error(`El id no existe ${id}`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  existsUserById,
};
