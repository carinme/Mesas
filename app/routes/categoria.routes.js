module.exports = app => {

    const categoria = require( "../controllers/categoriadao.controller.js" );
    var router = require("express").Router();

    router.post("/", categoria.create);
    router.get("/", categoria.findAll);
    router.get("/:id", categoria.findOne);

    router.put("/actualizar", categoria.actualizar);
    router.delete("/eliminar", categoria.eliminar);

    app.use("/api/categoria", router);
}