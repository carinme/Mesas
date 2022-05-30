const db = require("../models");
const Clientes = db.Clientes;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.cedula || !req.body.nombre || !req.body.apellido) {
        res.status(400).send({
            message: ["Debe completar todos los campos!"]
        });
        return;
    }
    // crea un cliente
    const cliente = {
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido
    };
    // Guardamos a la base de datos
    Clientes.create(cliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    message: err.errors.map(e => e.message)
                })
            } //other errors
            else res.status(500).send({
                message:
                    ["Ha ocurrido un error al crear el cliente."]
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Clientes.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: [`Error al obtener cliente con id ${id}`]
            });
        });
};

exports.findAll = (req, res) => {
    var condition = null;

    Clientes.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    [err.message || "Ocurrio un error al obtener los clientes."]
            });
        });
};

exports.findCI = (req, res) => {
    const cedula = req.params.cedula;
    Clientes.findAll({where: 
            {
                cedula: cedula
            }})
        .then(data => {
            if(data.length != 0){
                res.status(200).send(data);
            }else{
                res.status(404).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: [`Error al obtener cliente con cedula ${cedula}`]
            });
        });
};
