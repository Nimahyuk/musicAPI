const User = require("../models/User");
const Artist = require("../models/Artist");
const mongoosepagination = require("mongoose-pagination");
const bcrypt = require("bcrypt");

/**
 * Toma la entrada del usuario, verifica si el correo electrónico ya está en la base de datos, si no,
 * verifica si el artista favorito está en la base de datos, si lo está, crea un nuevo usuario y lo
 * guarda en la base de datos.
 * @param req - el objeto de solicitud
 * @param res - el objeto de respuesta
 */
const postUser = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.send("ERROR: Missing Data");
  }

  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (foundUser) {
      res.send("Email exist");
    } else {
      Artist.findOne({ name: req.body.favoriteArtist }, (err, foundArtist) => {
        if (!foundArtist) {
          res.send("Artist not Found");
        } else {
          const newUser = new User(req.body);
          const encryptPassword = bcrypt.hashSync(newUser.password, 10);
          newUser.password = encryptPassword;

          const artistID = foundArtist.id;
          newUser.favoriteArtist = artistID;

          newUser.save((err) => {
            if (!err) {
              res.send("User registered");
            } else {
              res.sen(err);
            }
          });
        }
      });
    }
  });
};

/**
 * Toma el correo electrónico y la contraseña del cuerpo de la solicitud, encuentra al usuario en la
 * base de datos, compara la contraseña del cuerpo de la solicitud con la contraseña de la base de
 * datos y, si coinciden, envía una respuesta con los datos del usuario.
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 */
const loginUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send("ERROR: Missing data");
  }
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (!foundUser) {
      res.send("User not found");
    } else {
      const validPassword = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      if (validPassword) {
        res.send({
          mensaje: "Correct validation",
          User: {
            id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
          },
        });
      } else {
        res.send("Incorrect password");
      }
    }
  });
};

/**
 * Encuentra un usuario por id y devuelve la información del usuario, excepto la contraseña.
 * @param req - el objeto de solicitud
 * @param res - el objeto de respuesta
 */
const getUserOne = (req, res) => {
  User.findOne(
    { _id: req.params.idUser },
    { password: false },
    (err, foundUser) => {
      if (!foundUser) {
        res.send("User not found.");
      } else {
        res.send(foundUser);
      }
    }
  );
};

/**
 * Obtiene todos los usuarios de la base de datos y los pagina.
 * @param req - El objeto de la solicitud.
 * @param res - El objeto de respuesta.
 */
const getAllUsers = (req, res) => {
  let page = req.params.page;
  if (!page) page = 1;
  page = parseInt(page);

  User.find().paginate(page, 5, (err, foundUsers) => {
    if (!err) {
      if (!foundUsers) {
        res.send("Users not found");
      } else {
        res.send(foundUsers);
      }
    } else {
      res.send(err);
    }
  });
};

/* Exportación de las funciones para ser utilizadas en otros archivos. */
module.exports = {
  postUser,
  loginUser,
  getUserOne,
  getAllUsers,
};
