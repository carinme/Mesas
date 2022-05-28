const db = require("../models");
const Reservas = db.Reservas;
const Mesas = db.Mesas;
const Clientes = db.Clientes;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.restaurante_id || !req.body.cliente_id || !req.body.mesa_id || !req.body.fecha || !req.body.hora_inicio || !req.body.hora_fin || !req.body.cantidad) {
        res.status(400).send({
            message: "Datos incompletos"
        });
        return;
    }
    // crea una venta
    const reserva = {
        restaurante_id: req.body.restaurante_id,
        cliente_id: req.body.cliente_id,
        mesa_id: req.body.mesa_id,
        fecha: req.body.fecha,
        hora_inicio: req.body.hora_inicio,
        hora_fin: req.body.hora_fin,
        cantidad: req.body.cantidad,
    };
    // Guardamos a la base de datos
    Reservas.create(reserva)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear una reserva."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Reservas.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener reserva con id=" + id
            });
        });
};

exports.findMesasLibres = (req, res) => {
    const restaurante_id = req.params.restaurante_id;
    const fecha = req.params.fecha;
    const hora_inicio = req.params.hora_inicio;
    const hora_fin = req.params.hora_fin;
    var arr = [];
    Reservas.findAll({
        where: {
            [Op.and]:
                [{ restaurante_id: restaurante_id },
                { fecha: fecha },
                {
                    hora_inicio:
                    {
                        [Op.lte]: hora_fin
                    }
                },
                {
                    hora_fin:
                    {
                        [Op.gte]: hora_inicio
                    }
                }]
        }
    }).then(data => {
        if (data.length === 0) {
            return Mesas.findAll({
                where: {
                    restaurante_id: restaurante_id
                }
            })
        } else {
            return Mesas.findAll({
                where: {
                    [Op.and]: [
                        { restaurante_id: restaurante_id },
                        {
                            [Op.not]: [
                                { id: data.map(d => d.mesa_id) }
                            ]
                        }
                    ]
                }
            })
        }
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener mesas " + err
            });
        });
};

exports.getReservas = (req, res) => {
    const restaurante_id = req.params.restaurante_id;
    const fecha = req.params.fecha;
    const cliente_id = req.params.cliente_id;

    Reservas.belongsTo(Mesas, { foreignKey: "mesa_id" });
    Reservas.belongsTo(Clientes, { foreignKey: "cliente_id" });
    if (cliente_id !== undefined) {
        Reservas.findAll({
            where: {
                [Op.and]:
                    [{ restaurante_id: restaurante_id },
                    { fecha: fecha },
                    { cliente_id: cliente_id },
                    ]
            },
            order: [
                [Mesas, "nombre", "ASC"],
                ["hora_inicio", "ASC"]
            ],
            include: [{
                model: Mesas,
                as: "Mesa"
            },
            {
                model: Clientes,
                as: "Cliente"
            }]
        }).catch(err => {
            res.status(500).send({
                message: "Error al obtener mesas " + err
            });
        }).then(data => { res.status(200).send(data); });
    }
    else {
        Reservas.findAll({
            where: {
                [Op.and]:
                    [{ restaurante_id: restaurante_id },
                    { fecha: fecha },
                    ]
            },
            order: [
                [Mesas, "nombre", "ASC"],
                ["hora_inicio", "ASC"]
            ],
            include: [{
                model: Mesas,
                as: "Mesa"
            },
            {
                model: Clientes,
                as: "Cliente"
            }]
        }).then(data => { res.status(200).send(data); })
            .catch(err => {
                res.status(500).send({
                    message: "Error al obtener mesas " + err
                });
            });
    }
};
