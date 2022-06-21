const { Categoria } = require("../models");
const db = require("../models");
const Producto = db.Producto;
//const Reserva = db.Reserva;
const CategoriaDAO = require("../controllers/categoriaDAO.controller.js");

const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    const producto = {

        nombre_producto: req.body.nombre_producto,
        precio: req.body.precio,
        categoriaIDIdCategoria: req.body.categoriaID,

    };
    // Guardamos a la base de datos

    Producto.create(producto)

        .then(data => {

            res.send(data);

    })
        .catch(err => {

            res.status(500).send({
            message:
            [err.message || "Ha ocurrido un error al crear el producto."]
        });

    });

};

exports.findOne = (req, res) => {

        const id = req.params.id;
        Producto.findByPk(id)
        .then(data => {
            res.send(data);
        })

        .catch(err => {
        res.status(500).send({

            message: ["Error al obtener el producto con id=" + id]

        });

        });

    };

exports.findAll = (req, res) => {

        const nombre_prod = req.query.nombre;

        var condition = nombre_prod ? { nombre_producto : { [Op.iLike]: `%${nombre_prod}%` } } : null;

        Producto.findAll({ where: condition })

        .then(data => {

            res.send(data);

        })

        .catch(err => {

        res.status(500).send({

        message:

        [err.message || "Ocurrio un error al obtener los productos."]

        });

        });

        };


//Funcion que obtiene las mesas que existen en ese restaurante
async function GetProducto(id_Producto){
    const producto = await Producto.findOne({ where: { id_Producto: id_Producto,
                                                },
     });
    return producto;

}

//Funcion que devuelve las mesas disponibles de acuerdo a lo solicitado por el cliente
/*async function encontrar_mesas(req,res){
      const datos = {
            inicio: req.body.inicio,
            fin: req.body.fin,
            id_restaurante : req.body.idRestaurante,
            fecha: req.body.fecha,
      }
      var mesas = await GetMesas(datos.id_restaurante);
      var mesas_disponibles = [];
      for (var mesa in mesas){
              var reserva = await Reserva.findAll({
                        where: {
                          mesaIDIdMesa: mesas[mesa].id_Mesa,
                          fecha: datos.fecha,
                          [Op.or]: [
                            { rango_hora_inicio: {[Op.between]:[datos.inicio,datos.fin]} },
                            { rango_hora_fin: {[Op.between]:[datos.inicio,datos.fin]} },
                          ]
                        }
                      });

              //si no hay reservas para esa mesa con los requisitos agregar a mesas disponibles
              if(reserva.length== 0){
                  mesas_disponibles.push(mesas[mesa]);
              }
          }
    res.send(mesas_disponibles);

}*/

exports.actualizar =  (req, res) =>{
    Producto.update({
        nombre_producto: req.body.nombre_producto,
        precio: req.body.precio,
        categoriaIDIdCategoria: req.body.categoriaID,
    },
    {
      where: {
        id_Producto: req.body.id_Producto,
      }
    }).then( (result) => res.json(result) );
}

exports.eliminar =  (req, res) =>{
    Producto.destroy({
      where: {
        id_Producto: req.body.id_Producto,
      }

    }).then( (result) => res.json(result) );
}

module.exports.GetProducto = GetProducto;
