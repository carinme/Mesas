module.exports = app => {
  const producto = require("../controllers/productodao.controller.js");
  var router = require("express").Router();
  router.post("/", producto.create);
  router.get("/:id", producto.findOne);
  router.get("/", producto.findAll);
  router.delete("/:id", producto.delete);
  router.put("/:id", producto.update);
  app.use('/api/producto', router);
};
