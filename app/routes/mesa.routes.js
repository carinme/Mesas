module.exports = app => {
    const mesa = require("../controllers/mesadao.controller.js");
    var router = require("express").Router();
    router.post("/", mesa.create);
    router.get("/:id", mesa.findOne);
    router.get("/", mesa.findAll);
    router.get("/restid/:id", mesa.findRestaurante);
    router.delete("/:id", mesa.delete);
    router.put("/:id", mesa.update);
    app.use('/api/mesa', router);
};
