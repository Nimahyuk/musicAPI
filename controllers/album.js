const Album = require("../models/Album");
const Artist = require("../models/Artist");

/**
 * Si no se proporciona el nombre del álbum, envíe un mensaje de error. Si se proporciona el nombre del
 * álbum, compruebe si el álbum ya existe. Si lo hace, envíe un mensaje de error. Si no es así,
 * compruebe si el artista existe. Si no es así, envía un mensaje de error. Si es así, cree un nuevo
 * álbum, guarde la ID del artista y guarde el álbum. Si hay un error, envía el error. Si no hay ningún
 * error, envíe un mensaje de éxito.
 */
const postAlbum = (req, res) => {
  if (!req.body.name) {
    res.send("ERROR: Missing Data");
  }

  Album.findOne({ name: req.body.name }, (err, foundAlbum) => {
    if (foundAlbum) {
      res.send("Album alredy exist");
    } else {
      Artist.findOne({ name: req.body.artist }, (err, foundArtist) => {
        if (!foundArtist) {
          res.send("Artist not found");
        } else {
          const newAlbum = new Album(req.body);
          const artistID = foundArtist.id;
          newAlbum.artist = artistID;
          newAlbum.save((err) => {
            if (!err) {
              res.send("Album register completed");
            } else {
              res.send(err);
            }
          });
        }
      });
    }
  });
};

/**
 * Elimina un álbum de la base de datos.
 */
const deleteAlbum = (req, res) => {
  console.log(req.params.albumName);
  Album.deleteOne(
    {
      name: req.params.albumName,
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
 * Actualiza el álbum con el nombre en los parámetros de la solicitud, con los datos en el cuerpo de la
 * solicitud, pero solo si el nombre en el cuerpo de la solicitud aún no existe.
 */
const patchAlbum = (req, res) => {
  Album.findOne({ name: req.body.name }, (err, foundAlbum) => {
    if (foundAlbum) {
      res.send("Invalid Name, alredy exist.");
    } else {
      Album.updateOne(
        {
          name: req.params.albumName,
        },
        {
          name: req.body.name,
          description: req.body.description,
          year: req.body.year,
          artist: req.body.artistID,
          create_at: Date.now(),
        },
        (err) => {
          if (!err) {
            res.send("Album Updated");
          } else {
            res.send(err);
          }
        }
      );
    }
  });
};

/**
 * Mostrar los datos del artista que creó el Álbum específico pasando el nombre por body
 */
const getArtistAlbum = (req, res) => {
  Album.findOne({ name: req.body.name }, (err, foundAlbum) => {
    if (foundAlbum) {
      Artist.find({ _id: foundAlbum.artist }, (err, foundArtist) => {
        if (foundArtist) {
          res.send(foundArtist);
        } else {
          res.send("Artist not found");
        }
      });
    } else {
      res.send("Album not found");
    }
  });
};

/**
 * Encuentra todos los álbumes en la base de datos y los pagina por 5.
 */
const getAlbum = (req, res) => {
  let page = req.params.page;
  if (!page) page = 1;
  page = parseInt(page);
  Album.find().paginate(page, 5, (err, foundAlbum) => {
    if (!err) {
      if (!foundAlbum) {
        res.send("Album not found");
      } else {
        res.send(foundAlbum);
      }
    } else {
      res.send(err);
    }
  });
};

/**
 * Esta función encuentra todos los álbumes con el año 2023 y los envía al cliente.
 */
const get2023Album = (req, res) => {
  Album.find({ year: "2023" }, (err, foundAlbum) => {
    if (foundAlbum) {
      res.send(foundAlbum);
    } else {
      res.send("Album not found");
    }
  });
};

/* Exportación de las funciones para ser utilizadas en otros archivos. */
module.exports = {
  postAlbum,
  deleteAlbum,
  patchAlbum,
  getArtistAlbum,
  getAlbum,
  get2023Album,
};
