const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const userRoutes = require("./routes/user");
const artistRoutes = require("./routes/artist");
const albumRoutes = require("./routes/album");
const songRoutes = require("./routes/songs");

/* Creando un servidor y configurando el puerto a 3000. */
const app = express();
const port = 3000;

/* Un middleware que se utiliza para analizar el cuerpo de la solicitud. */
app.use(bodyParser.urlencoded({ extended: true }));

/* Llamar a la función que se exporta desde el archivo base de datos.js. */
connection();


/* Importando las rutas desde la carpeta de rutas. */
app.use(userRoutes);
app.use(artistRoutes);
app.use(albumRoutes);
app.use(songRoutes);

/* Escuchando el puerto 3000. */
app.listen(port, function () {
  console.log(`Server in port: ${port}`);
});
