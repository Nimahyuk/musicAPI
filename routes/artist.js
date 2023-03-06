const express = require("express");
const router = express.Router();
const artistController = require("../controllers/artist");

/* El código anterior está creando una ruta para el controlador de artista. */
router.post("/artist", artistController.postArtist);
router.delete("/artist/:artistName", artistController.deleteArtist);
router.patch("/artist/:artistName", artistController.patchArtist);
router.get("/artists/", artistController.getArtists);

/* Exportación del enrutador que se usará en el archivo app.js principal. */
module.exports = router;
