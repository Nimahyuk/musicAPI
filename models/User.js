const mongoose = require("mongoose");

/* Creación de un esquema para el modelo de usuario. */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surname: String,
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  favoriteArtist: "ObjectId", 
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

/* Creando un modelo llamado Usuario con el esquema userSchema. */
const User = mongoose.model("User", userSchema);

module.exports = User;
