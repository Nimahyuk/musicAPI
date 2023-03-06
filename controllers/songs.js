const Song = require("../models/Songs");
const Album = require("../models/Album");

/**
 * Si la canción no existe, busque el álbum y guarde la canción.
 */
const postSong = (req, res) => {
  if (!req.body.name) {
    res.send("ERROR: Missing Data");
  }
  Song.findOne({ name: req.body.name }, (err, foundSong) => {
    if (foundSong) {
      res.send("Song alredy exist");
    } else {
      Album.findOne({ name: req.body.album }, (err, foundAlbum) => {
        if (!foundAlbum) {
          res.send("Album not found");
        } else {
          const newSong = new Song(req.body);
          const albumID = foundAlbum.id;
          newSong.album = albumID;
          newSong.save((err) => {
            if (!err) {
              res.send("Song register completed");
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
 * Elimina una canción de la base de datos.
 */
const deleteSong = (req, res) => {
  console.log(req.params.songName);
  Song.deleteOne(
    {
      name: req.params.songName,
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
 * Comprueba si el nombre de la canción ya existe, si existe, envía un mensaje de error, si no,
 * actualiza la canción.
 */
const patchSong = (req, res) => {
  Song.findOne({ name: req.body.name }, (err, foundSong) => {
    if (foundSong) {
      res.send("Invalid Name, alredy exist.");
    } else {
      Song.updateOne(
        {
          name: req.params.songName,
        },
        {
          name: req.body.name,
          duration: req.body.duration,
          create_at: Date.now(),
          album: req.body.albumID,
        },
        (err) => {
          if (!err) {
            res.send("Song Updated");
          } else {
            res.send(err);
          }
        }
      );
    }
  });
};

/**
 * Encuentra todas las canciones en la base de datos y las envía al cliente.
 */
const getSongs = (req, res) => {
  Song.find((err, foundSongs) => {
    if (foundSongs) {
      res.send(foundSongs);
    } else {
      res.send("Song not found");
    }
  });
};

/**
 *  Mostrar todas las canciones de un álbum determinado.
 *  Teniendo en cuenta que los ids son generados automaticamente,
 *  sería más sencillo usar la api de la siguiente forma pasando un nombre
 *  del album por body y a su vez buscando este mismo por id para poder mostrar
 *  todas las canciones de dicho álbum. Así que decidí cambiar la forma de hacerlo.
 *  De igual manera, dejo la forma original en comentarios (ver tambien /routes/songs.js)
 */
const getAlbumSongs = (req, res) => {
  Album.findOne({ name: req.body.name }, (err, foundAlbum) => {
    if (foundAlbum) {
      Song.find({ album: foundAlbum.id }, (err, foundSongs) => {
        if (foundSongs) {
          res.send(foundSongs);
        } else {
          res.send("The album is empty");
        }
      });
    } else {
      res.send("Album not found");
    }
  });
};

/**
 * const getAlbumSongs = (req, res) => {
 *     Song.find({ album: req.params.id }, (err, foundSongs) => {
 *       if (foundSongs) {
 *         res.send(foundSongs);
 *       } else {
 *         res.send("The album is empty");
 *       }
 *     });
 *   } else {
 *     res.send("Album not found");
 *   }
 * });
 * };
 */

/**
 * Obtiene las canciones paginadas de la base de datos.
 */
const getPaginatedSongs = (req, res) => {
  let page = req.params.page;
  if (!page) page = 1;
  page = parseInt(page);
  Song.find().paginate(page, 5, (err, foundSong) => {
    if (!err) {
      if (!foundSong) {
        res.send("Song not found");
      } else {
        res.send(foundSong);
      }
    } else {
      res.send(err);
    }
  });
};

/* Exportación de las funciones para ser utilizadas en otros archivos. */
module.exports = {
  postSong,
  deleteSong,
  patchSong,
  getSongs,
  getAlbumSongs,
  getPaginatedSongs,
};
