const mongoose = require("mongoose");

/* Creación de un esquema para el modelo Album. */
const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: String,
  year: Number,
  artist: "ObjectId",
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

/* Creando un modelo llamado Album, basado en albumSchema. */
const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
