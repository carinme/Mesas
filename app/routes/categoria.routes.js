module.exports = app => {
    const categoria = require("../controllers/categoriadao.controller.js");
    var router = require("express").Router();
    router.post("/", categoria.create);
    router.get("/:id", categoria.findOne);
    router.delete("/:id", categoria.delete);
    router.put("/:id", categoria.update);
    app.use('/api/categoria', router);
};
