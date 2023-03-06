const mongoose = require("mongoose");

/* Esto está creando un nuevo esquema para el modelo de artista. */
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: String,
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

/* Creando un nuevo modelo llamado Artista. */
const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
