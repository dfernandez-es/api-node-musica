const Song = require("../models/Song");

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.send(err);
  }
};

exports.saveSong = async (req, res) => {
  try {
    const song = new Song({
      title: "master of puppets",
      band: "metallica",
      path: "../",
    });
    await song.save();
    res.json(song.id);
  } catch (err) {
    res.send(err);
  }
};
