module.exports = app => {
    const restaurante = require("../controllers/restaurantedao.controller.js");
    var router = require("express").Router();
    router.post("/", restaurante.create);
    router.get("/:id", restaurante.findOne);
    router.get("/", restaurante.findAll);
    router.delete("/:id",restaurante.destroy);
    router.put("/:id",restaurante.update);
    app.use('/api/restaurante', router);
};
