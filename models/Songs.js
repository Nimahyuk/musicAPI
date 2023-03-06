const mongoose = require("mongoose");

/* Creación de un esquema para la colección de canciones. */
const songsSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  duration: Number,
  album: "ObjectId", //AlbumId
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

/* Creación de un modelo para la colección de canciones. */
const Songs = mongoose.model("Songs", songsSchema);

module.exports = Songs;
