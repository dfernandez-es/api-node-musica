const Song = require("../models/Song");

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.send(err);
  }
};

const saveSong = async (req, res) => {
  try {
    const { title, band, path, img = "" } = req.body;
    const song = new Song({
      title,
      band,
      path,
      img,
    });
    await song.save();
    res.json(song.id);
  } catch (err) {
    res.send(err);
  }
};

module.exports = { getAllSongs, saveSong };
