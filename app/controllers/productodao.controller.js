const db = require("../models");
const Productos = db.Productos;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre || !req.body.categoria_id || !req.body.precio) {
        res.status(400).send({
            message: "Datos incompletos"
        });
        return;
    }
    // crea una producto
    const producto = {
        nombre: req.body.nombre,
        categoria_id : req.body.categoria_id,
        precio: req.body.precio
    };
    // Guardamos a la base de datos
    Productos.create(producto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear una producto."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Productos.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener producto con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    var condition = null;

    Productos.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los productos."
            });
        });
};

exports.delete = (req,res) => {
    const id = req.params.id;
    Productos.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al eliminar producto con id=" + id
        });
    });   
};

exports.update = (req,res) => {
    const id = req.params.id;
    const producto = {
        nombre: req.body.nombre,
        categoria_id : req.body.categoria_id,
        precio: req.body.precio
    };
    Productos.update(producto, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar Productos con id=" + id + err
        });
    });
};
