const mongoose = require("mongoose")

mongoose.set("strictQuery", true)

/**
 * Esta función intentará conectarse a la base de datos y, si falla, registrará el error.
 */
const connection = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/musicDB")
    console.log("Conected to database")
  } catch (err) {
    console.log(err)
  }
};

module.exports = connection