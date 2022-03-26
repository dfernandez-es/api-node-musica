const express = require("express");
const routes = express.Router();
const SongsController = require("../controller/Songs");

routes.get("/", (req, res) => {
  res.send("hola");
});

routes.get("/songs", SongsController.getAllSongs);
routes.get("/save", SongsController.saveSong);

module.exports = routes;
