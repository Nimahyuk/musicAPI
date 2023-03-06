const express = require("express");
const router = express.Router();
const albumController = require("../controllers/album");

/* Creación de una ruta para el álbum. */
router.post("/album", albumController.postAlbum);
router.delete("/album/:albumName", albumController.deleteAlbum);
router.patch("/album/:albumName", albumController.patchAlbum);
router.get("/album/artist", albumController.getArtistAlbum);
router.get("/album/:page?", albumController.getAlbum);
router.get("/album/year/2023", albumController.get2023Album);

/* Exportación del enrutador que se usará en el archivo app.js principal. */
module.exports = router;