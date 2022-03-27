const express = require("express");
const router = express.Router();
const { getAllSongs, saveSong } = require("../controller/songs");
const { check } = require("express-validator");
const validateJWT = require("../middlewares/validate-jwt");
const { fieldsValidation } = require("../middlewares/validate-fields");
const isAdminRole = require("../middlewares/validate-isAdmin");

router.get("/songs", [validateJWT], getAllSongs);

router.post(
  "/save",
  [
    validateJWT,
    isAdminRole,
    check("title", "Title is required").not().isEmpty(),
    check("band", "Bamd is required").not().isEmpty(),
    check("path", "Path is required").not().isEmpty(),
    fieldsValidation,
  ],
  saveSong
);

module.exports = router;
