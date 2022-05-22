const db = require("../models");
const Restaurantes = db.Restaurantes;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre || !req.body.direccion) {
        res.status(400).send({
            message: "Datos incompletos"
        });
        return;
    }
    // crea un restaurante
    const restaurante = {
        nombre: req.body.nombre,
        direccion: req.body.direccion
    };
    // Guardamos a la base de datos
    Restaurantes.create(restaurante)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear el restaurante."
            });
        });
};

exports.destroy = (req, res) => {
    const id = req.params.id;
    Restaurantes.destroy({ where: { id: id } }).then(data => {
        res.status(200).send({ message: `Restaurante con id: ${id} eliminado exitosamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al crear el restaurante."
        });
    });
}

exports.update = (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const direccion = req.body.direccion;
    Restaurantes.update({
        nombre: nombre,
        direccion : direccion
    },
        {
            where:
            {
                id: id
            }, 
            returning : true,
            plain : true
        }).then(
            data => {
                res.status(200).send(data);
            }).catch(
                err => {
                    res.status(500).send({
                        message:
                            err.message || "Ha ocurrido un error. No se ha podido actualizar el restaurante."
                    });
                });
}


exports.findOne = (req, res) => {
    const id = req.params.id;
    Restaurantes.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener restaurante con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    var condition = null;

    Restaurantes.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los restaurantes."
            });
        });
};
