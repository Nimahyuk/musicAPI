const express = require("express");
const router = express.Router();
const songsController = require("../controllers/songs");

/* El código anterior define las rutas para el controlador de canciones. */
router.post("/songs", songsController.postSong);
router.delete("/songs/:songName", songsController.deleteSong);
router.patch("/songs/:songName", songsController.patchSong);
router.get("/songs/", songsController.getSongs);
router.get("/songs/album", songsController.getAlbumSongs);
router.get("/songs/paginated/:page?", songsController.getPaginatedSongs);
/** 
 * Alternativa para el caso de /controllers/songs.js
 *  router.get("/songs/:id", songsController.getAlbumSongs);
 */ 

/* Exportando el objeto del enrutador. */
module.exports = router;
