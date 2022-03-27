const express = require("express");
const router = express.Router();
const SongsController = require("../controller/songs");
const { fieldsValidation } = require("../middlewares/validate-fields");
const { login } = require("../controller/auth");
const { check } = require("express-validator");
const { emailExists, isValidRole } = require("../helpers/db-validators");
const { userPost } = require("../controller/user");
const validateJWT = require("../middlewares/validate-jwt");

router.get("/", (req, res) => {
  res.send("hola");
});

router.get("/songs", [validateJWT], SongsController.getAllSongs);
router.get("/save", SongsController.saveSong);

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    fieldsValidation,
  ],
  login
);

router.post(
  "/user/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
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
