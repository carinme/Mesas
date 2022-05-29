const db = require("../models");
const Reservas = db.Reservas;
const Mesas = db.Mesas;
const Hora_Reserva = db.Horas_Reservas;
const hora_controller = require("../controllers/horas_reservadao.controller.js");
const Clientes = db.Clientes;
const Op = db.Sequelize.Op;
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.hasOwnProperty('restaurante_id') || !req.body.hasOwnProperty('cliente_id') || !req.body.hasOwnProperty('mesa_id') || !req.body.hasOwnProperty('fecha') || !req.body.hasOwnProperty('horas') || !req.body.hasOwnProperty('cantidad')) {
        res.status(400).send({
            message: ["Datos incompletos"]
        });
        return;
    }
    console.log(req.body.horas);
    var r = (await findHorariosOcupadosByMesa(req.body.mesa_id, req.body.restaurante_id, req.body.fecha, req.body.horas));
    if (r.length > 0){
        for (const rKey in r) {
            console.log(rKey);
        }
        res.status(409).send({
            message: ["Espacio ya ocupado"]
        });
        return;
    }

        // crea una venta
        const reserva = {
            restaurante_id: req.body.restaurante_id,
            cliente_id: req.body.cliente_id,
            mesa_id: req.body.mesa_id,
            cantidad: req.body.cantidad,
        };
    // Guardamos a la base de datos
    Reservas.create(reserva)
        .then(data => {
            req.body.horas.forEach(function(t, index) {
                console.log(`${data.id} ${t.hora_inicio} ${t.hora_fin}`);
                hora_controller.create(req, data.id, t.hora_inicio, t.hora_fin, res);
            });
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message:
                    ["Ha ocurrido un error al crear una reserva."]
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
                message: ["Error al obtener reserva con id=" + id]
            });
        });
};

async function findHorariosOcupadosByMesa(mesa_id, restaurante_id, fecha, horas) {
    console.log(horas.map(h => h.hora_inicio))
    var _reserv = await Reservas.findAll({
        where: {
            [Op.and]:
                [
                    {restaurante_id: restaurante_id},
                    {mesa_id: mesa_id},
                ],
        },
        include: [{
            model: Hora_Reserva,
            where: {
                fecha: fecha,
                hora_inicio: {
                    [Op.in]:horas.map(h => h.hora_inicio)
                }
            }
        }]
    });
    return _reserv;
}

exports.findMesasLibres = (req, res) => {
    const restaurante_id = req.params.restaurante_id;
    const fecha = req.body.fecha;
    const horas = req.body.horas;
    console.log(horas.map(h => h.hora_inicio));
    var arr = [];
    Mesas.findAll({
        where: {
            [Op.and]:
                [{ restaurante_id: restaurante_id },
                ]
        },
        include: [{
            required: true,
            model: Reservas,
            where: {
                restaurante_id: restaurante_id,
                '$Horas_Reservas.hora_inicio$': { [Op.notIn]: horas.map(h => h.hora_inicio) },
            },
            include: [{
                required: true,
                model: Hora_Reserva,
                as: "Horas_Reservas",
                where: {
                    fecha: fecha,
                    hora_inicio: {
                        [Op.notIn]:horas.map(h => h.hora_inicio)
                    }
                }
        }]

    }]
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error al obtener mesas " + err
            });
        });
};

exports.getReservas = (req, res) => {
    const restaurante_id = req.params.restaurante_id;
    const fecha = req.params.fecha;
    const cliente_id = req.params.cliente_id;

    if (cliente_id !== undefined) {
        Reservas.findAll({
            where: {
                [Op.and]:
                    [{ restaurante_id: restaurante_id },
                    { cliente_id: cliente_id },
                    ]
            },
            order: [
                [Mesas, "nombre", "ASC"],
                [Hora_Reserva,"hora_inicio", "ASC"]
            ],
            include: [{
                model: Mesas,
                as: "Mesa"
            },
            {
                model: Clientes,
                as: "Cliente"
            },
            {
                model: Hora_Reserva,
                where: {
                    fecha: fecha,
                }
            },
            ]
        }).catch(err => {
            res.status(500).send({
                message: "Error al obtener reserva " + err
            });
        }).then(data => { res.status(200).send(data); });
    }
    else {
        Reservas.findAll({
            where: {
                [Op.and]:
                    [{ restaurante_id: restaurante_id },
                    ]
            },
            order: [
                [Mesas, "nombre", "ASC"],
                [Hora_Reserva,"hora_inicio", "ASC"]
            ],
            include: [{
                model: Mesas,
            },
            {
                model: Clientes,
            },
            {
                model: Hora_Reserva,
                where: {
                    fecha: fecha,
                }
            },
            ]
        }).then(data => { res.status(200).send(data); })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                    message: ["Error al obtener reserva " + err]
                });
            });
    }
};
