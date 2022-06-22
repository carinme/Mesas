const db = require("../models");
const Detalles = db.Detalles;
const Consumos = db.Consumos;
const Productos = db.Productos;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id_cabecera || !req.body.id_producto || !req.body.cantidad) {
        res.status(400).send({
            message: "Debe completar todos los campos!"
        });
        return;
    }
    // crea un cliente
    const detalle = {
        id_cabecera: req.body.id_cabecera,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad
    };
    // Guardamos a la base de datos
    Detalles.create(detalle)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear el detalle."
            });
    });
};

exports.findAll = (req, res) => {
    var condition = null;

    Detalles.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los consumos."
            });
        });
};

exports.delete = (req,res) => {
    const id = req.params.id;
    Detalles.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).send({ message: `Detalle con id: ${id} eliminado exitosamente` });
    })
        .catch(err => {
            res.status(500).send({
                message: "Error el detalle con id=" + id
            });
        });
};

exports.findIDCabecera = (req, res) => {
    Detalles.belongsTo(Productos, { foreignKey: "id_producto" });

    const id_cabecera = req.params.id;
    Detalles.findAll({where: 
            {
                id_cabecera: id_cabecera
            },
            include: [{
                model: Productos,
                as: "Producto"
            }]})
        .then(data => {
            if(data.length != 0){
                res.status(200).send(data);
            }else{
                res.status(404).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al obtener consumo con id de cliente ${id_cliente}`
            });
        });
};
