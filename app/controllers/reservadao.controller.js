const { Cliente } = require("../models");
const db = require("../models");
const Mesa = db.Mesa;
const Reserva = db.Reserva;
const mesaDAO = require("../controllers/mesaDAO.controller.js");
const clienteDAO = require("../controllers/clienteDAO.controller.js");

const Op = db.Sequelize.Op;


exports.create = async function(req, res){

    var idMesa = await VerificarMesa(req.body.rango_hora_inicio, req.body.rango_hora_fin, req.body.idRestaurante,req.body.fecha, req.body.cantidad);

    //guardamos datos de la reserva con el id de la mesa selecciono el cliente
    const reserva = {
        cantidad: req.body.cantidad,
        rango_hora_inicio: req.body.rango_hora_inicio,
        rango_hora_fin: req.body.rango_hora_fin,
        fecha: req.body.fecha,
        mesaIDIdMesa: idMesa,
        clienteIDIdCliente: req.body.clienteID,
    };
    Reserva.create(reserva)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
            err.message || "Ha ocurrido un error al crear la reserva."
        });
    });
};

exports.findOne = (req, res) => {
        const id = req.params.id;
        Reserva.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: "Error al obtener la reserva con id=" + id
        });
        });

    };


exports.findAll = (req, res) => {
        const nombre_res = req.query.nombre;
        var condition = nombre_res ? { id_Reserva : { [Op.iLike]: `%${nombre_res}%` } } : null;
        Reserva.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })

        .catch(err => {

        res.status(500).send({

        message:

        err.message || "Ocurrio un error al obtener las reservas."

        });

        });

};

exports.getReservas = async function(req, res){
    var reservas_solicitadas = await obtenerReservas(req.body.id_Restaurante, req.body.cedula, req.body.fecha);
    res.send(reservas_solicitadas);
};

async function obtenerReservas(idrestaurante,cedulacliente,fecha){
    var mesas = await mesaDAO.GetMesas(idrestaurante);
    var reservas_solicitadas = [];
    if( cedulacliente == 0 ){
         for (var mesa in mesas){
            var reserva = await Reserva.findAll({
                      where: {
                        mesaIDIdMesa: mesas[mesa].id_Mesa,
                        fecha: fecha,

                      },
                         order:[
                              ['rango_hora_inicio','ASC'],
                        ],
                    });
            //si no hay reservas para esa mesa con los requisitos, enviar return id mesa para reservarlo
            if(reserva.length!= 0){
                reservas_solicitadas.push(reserva);
            }
         }
         return reservas_solicitadas;
    }else{
        var idcliente = await clienteDAO.getClienteID(cedulacliente);
        if( idcliente !=0 ){
            for (var mesa in mesas){
                var reserva = await Reserva.findAll({
                          where: {
                            mesaIDIdMesa: mesas[mesa].id_Mesa,
                            fecha: fecha,
                            clienteIDIdCliente: idcliente,
                          },
                          order:[
                              ['rango_hora_inicio','ASC'],
                          ],
                        });
                //si no hay reservas para esa mesa con los requisitos, enviar return id mesa para reservarlo
                if(reserva.length!= 0){
                    reservas_solicitadas.push(reserva);
                }
            }
            return reservas_solicitadas;

        }else{
            return reservas_solicitadas;
        }
    }
};

async function VerificarMesa(inicio, fin, idrestaurante,fecha,cantidad){
    //se obtiene las mesas de ese restaurante que cumplan con la capacidad sugerida
    var mesas = await mesaDAO.GetMesas(idrestaurante);
    var id = 0;
    //se recorre las mesas de ese restaurante para saber si esta ocupado o no para esa hora.
    for (var mesa in mesas){
        var reserva = await Reserva.findAll({
                  where: {
                    mesaIDIdMesa: mesas[mesa].id_Mesa,
                    fecha: fecha,
                    [Op.or]: [
                      { rango_hora_inicio: {[Op.between]:[inicio,fin]} },
                      { rango_hora_fin: {[Op.between]:[inicio,fin]} },

                    ]
                  }
                });
        //si no hay reservas para esa mesa con los requisitos, enviar return id mesa para reservarlo
        if(reserva.length== 0){
            id =  mesas[mesa].id_Mesa;
            break;
        }
    }
    return id;
};

module.exports.VerificarMesa = VerificarMesa;
module.exports.obtenerReservas = obtenerReservas;