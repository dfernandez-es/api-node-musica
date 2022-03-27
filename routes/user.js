const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { userPost, userGet } = require("../controller/user");
const { emailExists, isValidRole } = require("../helpers/db-validators");
const { fieldsValidation } = require("../middlewares/validate-fields");
const isAdminRole = require("../middlewares/validate-isAdmin");
const validateJWT = require("../middlewares/validate-jwt");

router.get("/", [validateJWT, isAdminRole], userGet);

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "The password must be more than 6 letters").isLength({
      min: 6,
    }),
    check("email", "The email is not valid").isEmail(),
    check("email").custom(emailExists),
    check("role").custom(isValidRole),
    fieldsValidation,
  ],
  userPost
);

module.exports = router;
