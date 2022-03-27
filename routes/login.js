const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { login } = require("../controller/auth");
const { fieldsValidation } = require("../middlewares/validate-fields");

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    fieldsValidation,
  ],
  login
);
module.exports = router;
