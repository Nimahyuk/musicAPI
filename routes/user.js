const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

/* Creando las rutas para la API. */
router.post("/user", userController.postUser);
router.post("/users/login", userController.loginUser);
router.get("/users/profile/:idUser", userController.getUserOne);
router.get("/users/:page?", userController.getAllUsers);

/* Exportación del enrutador que se usará en el archivo app.js principal. */
module.exports = router;
