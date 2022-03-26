const { Schema, model } = require("mongoose");

const SongsSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  band: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
});

SongsSchema.methods.toJSON = function () {
  const { __v, _id, path, ...song } = this.toObject();
  return song;
};

module.exports = model("Song", SongsSchema);
