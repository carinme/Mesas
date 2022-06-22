const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");
db.sequelize.sync();
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido Node backend 2022" });
});

require("./app/routes/mesa.routes")(app);
require("./app/routes/restaurante.routes")(app);
require("./app/routes/cliente.routes")(app);
require("./app/routes/reserva.routes")(app);
require("./app/routes/consumo.routes")(app);
require("./app/routes/detalle.routes")(app);
require("./app/routes/producto.routes")(app);
require("./app/routes/categoria.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 9091;
app.listen(PORT, () => {
    console.log('Servidor corriendo en puerto 9091.');
});
