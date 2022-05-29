const db = require("../models");
const Mesas = db.Mesas;
const Op = db.Sequelize.Op;
exports.create = async (req, res) => {

    console.log(req.body);
    // Validate request
    if (!req.body.hasOwnProperty('nombre') || !req.body.hasOwnProperty('restaurante_id') || !req.body.hasOwnProperty('posicion_x') || !req.body.hasOwnProperty('posicion_y')  || !req.body.hasOwnProperty('capacidad')) {
        res.status(400).send({
            message: ["Datos incompletos"]
        });
        return;
    }

    //if find a coincidence send a error
    if((await findRestaurantePos(req, res)).length > 0){
        res.status(409).send({
            message: ["Espacio ya ocupado"]
        });
        return;
    }
    // crea una venta
    const mesa = {
        nombre: req.body.nombre,
        restaurante_id: req.body.restaurante_id,
        posicion_x: req.body.posicion_x,
        posicion_y: req.body.posicion_y,
        planta: req.body.planta,
        capacidad: req.body.capacidad,
        estado: req.body.estado
    };
    // Guardamos a la base de datos
    Mesas.create(mesa)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);

            // if is a validation error
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    message: err.errors.map(e => e.message)
                })
            } //other errors
            else res.status(500).send({
                message:
                    ["Ha ocurrido un error al crear una mesa."]
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

// Search someone coincidence
function findRestaurantePos(req, res){

    const restaurante_id = req.body.restaurante_id;
    const restaurante_pos_x = req.body.posicion_x;
    const restaurante_pos_y = req.body.posicion_y;
    return Mesas.findAll({ where:
            {
                restaurante_id: restaurante_id,
                posicion_x: restaurante_pos_x,
                posicion_y: restaurante_pos_y,
            }})
        .catch(err => {
            console.log(err.message);
        });
}

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