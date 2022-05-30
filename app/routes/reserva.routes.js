module.exports = app => {
    const reserva = require("../controllers/reservadao.controller.js");
    var router = require("express").Router();
    router.post("/", reserva.create);
    router.get("/:id", reserva.findOne);
    router.get("/mesasLibres/:restaurante_id", reserva.findMesasLibres)
    router.get("/:restaurante_id/:fecha/", reserva.getReservas)
    router.get("/:restaurante_id/:fecha/:cliente_id/", reserva.getReservas)
    
    app.use('/api/reserva', router);
};
