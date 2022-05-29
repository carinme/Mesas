module.exports = app => {

    const producto = require("../controllers/productoDAO.controller.js");

    var router = require("express").Router();

    router.post("/", producto.create);

   // router.get("/", producto.findAll);

    //router.get("/encontrar_mesas", mesa.encontrar_mesas);

    router.get("/:id", producto.findOne);
    router.get("/", producto.findAll);

/*
EN EL PUT SE NECESITA DE ESTA MANERA JSON
   {
     "nombre_mesa":"mesadeput",
     "pos_x":20,
     "pos_y":20,
     "nro_piso":2,
     "capacidad":7,
     "restauranteID":1,
     "id_Mesa":1
  }*/

    router.put("/actualizar", producto.actualizar);

/*
EL DELETE SE NECESITA DE ESTA MANERA JSON
{
   "id_Mesa":1
}
*/
    router.delete("/eliminar", producto.eliminar);

    app.use('/api/producto', router);

    };