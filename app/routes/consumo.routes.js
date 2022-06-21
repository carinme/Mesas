module.exports = app => {
    const consumo = require("../controllers/consumodao.controller.js");
    var router = require("express").Router();
    router.post("/", consumo.create);
    router.put("/:id", consumo.update);
    router.get("/:id/factura",consumo.factura);
    router.get("/:id", consumo.findIDCliente);
    router.get("/ocupado/:id", consumo.findOcupado);
    router.get("/", consumo.findAll);
    app.use('/api/consumo', router);
};
