module.exports = app => {

    const reserva = require("../controllers/reservaDAO.controller.js");

    var router = require("express").Router();

    router.post("/", reserva.create);

    router.get("/", reserva.findAll);

    router.get("/:id", reserva.findOne);

/*
Hacer get de esto. Si no se quiere cliente PONER CEDULA = 0
{
    "id_Restaurante":2,
    "cedula":55562632562,
    "fecha":"2021/04/23"
}
*/
    router.get("/obtenerReservas/reserva", reserva.getReservas);

    app.use('/api/reserva', router);

};