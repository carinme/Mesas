const categoria = require("../controllers/categoriadao.controller");
module.exports = app => {
    const detalle = require("../controllers/detalle_consumodao.controller.js");
    var router = require("express").Router();
    router.post("/", detalle.create);
    router.get("/:id", detalle.findIDCabecera);
    router.delete("/:id", detalle.delete);
    router.get("/", detalle.findAll);
    app.use('/api/detalle', router);
};
