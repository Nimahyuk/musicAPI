const Artist = require("../models/Artist");

/**
 * Si el cuerpo de la solicitud no tiene nombre, envíe un mensaje de error. De lo contrario, compruebe
 * si el artista ya existe. Si lo hacen, envíe un mensaje diciendo que ya existen. Si no lo hacen, cree
 * un nuevo artista y guárdelo en la base de datos.
 */
const postArtist = (req, res) => {
  if (!req.body.name) {
    res.send("ERROR: Missing Data");
  }

  Artist.findOne({ name: req.body.name }, (err, foundArtist) => {
    if (foundArtist) {
      res.send("Artist alredy exist");
    } else {
      const newArtist = new Artist(req.body);
      newArtist.save((err) => {
        if (!err) {
          res.send("Artist register completed");
        } else {
          res.send(err);
        }
      });
    }
  });
};

/**
 * Elimina un artista de la base de datos.
 */
const deleteArtist = (req, res) => {
  console.log(req.params.artistName);
  Artist.deleteOne(
    {
      name: req.params.artistName,
    },
    (err) => {
      if (!err) {
        res.send("Deleted");
      } else {
        res.send(err);
      }
    }
  );
};

/**
 * Actualiza un artista por nombre, si existe el nuevo nombre en la base de datos, envía un mensaje al usuario de que ya existe,
 * si no existe, actualiza el artista con el nuevo nombre y descripción.
 */
const patchArtist = (req, res) => {
  Artist.findOne({ name: req.body.name }, (err, foundArtist) => {
    if (foundArtist) {
      res.send("Invalid Name, alredy exist.");
    } else {
      Artist.updateOne(
        {
          name: req.params.artistName,
        },
        {
          name: req.body.name,
          description: req.body.description,
        },
        (err) => {
          if (!err) {
            res.send("Artist Updated");
          } else {
            res.send(err);
          }
        }
      );
    }
  });
};

/**
 * Encuentra a todos los artistas en la base de datos y los envía al cliente.
 */
const getArtists = (req, res) => {
    Artist.find((err, foundArtists) => {
        if (foundArtists) {
            res.send(foundArtists)
        } else {
            res.send("Artist not found");
        }
    })
}

/* Exportación de las funciones para ser utilizadas en otros archivos. */
module.exports = {
  postArtist,
  deleteArtist,
  patchArtist,
  getArtists
};
