const db = require("../models");
const Mesas = db.Mesas;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre || !req.body.restaurante_id || !req.body.posicion || !req.body.capacidad) {
        res.status(400).send({
            message: "Datos incompletos"
        });
        return;
    }
    // crea una venta
    const mesa = {
        nombre: req.body.nombre,
        restaurante_id: req.body.restaurante_id,
        posicion: req.body.posicion,
        planta: req.body.planta,
        capacidad: req.body.capacidad
    };
    // Guardamos a la base de datos
    Mesas.create(mesa)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear una mesa."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Mesas.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener mesa con id=" + id
            });
        });
};

exports.findRestaurante = (req, res) => {

    const restaurante_id = req.params.id;
    Mesas.findAll({ where: 
            {
                restaurante_id: restaurante_id
            }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las mesas."
            });
        });
};

exports.findAll = (req, res) => {
    var condition = null;

    Mesas.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener las mesas."
            });
        });
};

exports.delete = (req,res) => {
    const id = req.params.id;
    Mesas.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al eliminar mesa con id=" + id
        });
    });   
};

exports.update = (req,res) => {
    const id = req.params.id;
    const mesa = {
        nombre: req.body.nombre,
        restaurante_id: req.body.restaurante_id,
        posicion: req.body.posicion,
        planta: req.body.planta,
        capacidad: req.body.capacidad
    };
    Mesas.update(mesa, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar mesas con id=" + id + err
        });
    });
};