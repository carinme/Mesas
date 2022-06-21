const db = require("../models");
const Categorias = db.Categorias;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Datos incompletos"
        });
        return;
    }
    // crea una categoria
    const categoria = {
        nombre: req.body.nombre
    };
    // Guardamos a la base de datos
    Categorias.create(categoria)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear una categoria."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Categorias.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener categoria con id=" + id
            });
        });
};

exports.delete = (req,res) => {
    const id = req.params.id;
    Categorias.destroy({
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al eliminar categoria con id=" + id
        });
    });   
};

exports.update = (req,res) => {
    const id = req.params.id;
    const categoria = {
        nombre: req.body.nombre
    };
    Categorias.update(categoria, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar Categorias con id=" + id + err
        });
    });
};
