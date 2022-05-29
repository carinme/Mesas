const db = require("../models");
const Reservas = db.Reservas;
const Horas_Reservas = db.Horas_Reservas;
const Mesas = db.Mesas;
const Op = db.Sequelize.Op;

function BodyException(message) {
    this.message = message;
    this.name = 'BodyException';
}

BodyException.prototype.toString = function() {
    return `${this.name}: "${this.message}"`;
}

exports.create = (req, reserva_id, hora_inicio, hora_fin, res) => {
    // Validate request
    if (!req.body.hasOwnProperty('fecha') ) {
        throw new BodyException("campos del body incompletos");
    }
    // crea una venta
    const reserva = {
        reserva_id: reserva_id,
        fecha: req.body.fecha,
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
    };
    // Guardamos a la base de datos
    Horas_Reservas.create(reserva)
        .then(data => {
            return (data);
        })
        .catch(err => {
            console.log(err);
            throw err ;
        });
};

