const db = require("../models");
const Consumos = db.Consumos;
const Detalles = db.Detalles;
const Restaurantes = db.Restaurantes;
const Clientes = db.Clientes;
const Mesas = db.Mesas;
const Productos = db.Productos;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id_mesa || !req.body.id_cliente || !req.body.estado || !req.body.horafecha_creacion) {
        res.status(400).send({
            message: "Debe completar todos los campos!"
        });
        return;
    }
    // crea un cliente
    const consumo = {
        id_mesa: req.body.id_mesa,
        id_cliente: req.body.id_cliente,
        estado: req.body.estado,
        total: req.body.total,
        horafecha_creacion: req.body.horafecha_creacion
    };
    // Guardamos a la base de datos
    Consumos.create(consumo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear el consumo."
            });
        });
};

exports.update = (req,res) => {
    const id = req.params.id;
    const consumo = {
        id_mesa: req.body.id_mesa,
        id_cliente: req.body.id_cliente,
        estado: req.body.estado,
        total: req.body.total,
        horafecha_creacion: req.body.horafecha_creacion,
        horafecha_cierre: req.body.horafecha_cierre
    };
    Consumos.update(consumo, {
        where: {
            id: id
        }
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar Consumo con id=" + id + err
        });
    });
};

exports.findAll = (req, res) => {
    var condition = null;

    Consumos.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los consumos."
            });
        });
};

exports.findOcupado = (req, res) => {

    Consumos.belongsTo(Clientes, { foreignKey: "id_cliente" });

    const id_mesa = req.params.id;
    Consumos.findAll({where:
        {
            [Op.and]:
                [{ id_mesa: id_mesa },
                { estado: "Abierto" },
                ]
        },
        include: [{
            model: Clientes,
            as: "Cliente"
        }]
    }).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Ocurrio un error al obtener los consumos."
        });
    });
}

exports.findIDCliente = (req, res) => {
    const id_cliente = req.params.id;
    Consumos.findAll({where: 
            {
                id_cliente: id_cliente
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
                message: `Error al obtener consumo con id de cliente ${id_cliente}`
            });
        });
};


exports.factura = async (req,res) => {
    const id = req.params.id;
    const pdf = require('html-pdf');
    try{
        const consumo = await Consumos.findByPk(id);
        const detalles = await Detalles.findAll({where: {id_cabecera: id}});
        const cliente = await Clientes.findByPk(consumo.id_cliente);
        const mesa = await Mesas.findByPk(consumo.id_mesa);
        const restaurante = await Restaurantes.findByPk(mesa.restaurante_id);
        for (let i = 0; i < detalles.length; i++){
            let producto = await Productos.findByPk(detalles[i].dataValues.id_producto)
            detalles[i].dataValues.producto = producto;
        }
        let  date = consumo.horafecha_cierre;
        let fecha = "";
        if (date){
            fecha =  ("00" + date.getDate()).slice(-2) + "/" +
            ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
            date.getFullYear() + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2);
        }
        let html =  `
            <div>
                <center>
                <h1>${restaurante.nombre}</h1>
                <span>${restaurante.direccion}</span>
                <center/>
                <hr/>
                <center>
                <span>Cliente: ${cliente.nombre} ${cliente.apellido}</span><br/>
                <span>Documento: ${cliente.cedula}</span><br/>
                <span>${fecha}<span/>
                <center/>
                <hr/>
                <center>
                <span> ${mesa.nombre}</span><br/>
                <h5>Detalles</h5>
                <center/>
                ${
                    detalles.reduce((acc,cur)=>{
                        let result = "<center>" + acc + "<br/>";
                        result += "<h6>" + cur.dataValues.producto.dataValues.nombre + "</h6>";
                        result += "Cantidad: " + cur.dataValues.cantidad + "<br/>";
                        result += "Costo Unitario: Gs. " + cur.dataValues.producto.dataValues.precio + "<br/>";
                        result += "Costo total: Gs. " + cur.dataValues.producto.dataValues.precio * cur.dataValues.cantidad + "<br/>";
                        result += "<center/><hr/>"
                        return result;
                    },"")
                }
                <center><span>Total: Gs. ${consumo.total}</span><center/> 
            </div>
         `
        pdf.create(html,{"width":"8in"}).toStream((err,stream)=>{
            res.setHeader('Content-Type','application/pdf');
            res.setHeader('Content-Disposition','attachment; filename=ticket.pdf');
            stream.pipe(res);
        });
    }
    catch(e){
        console.log(e);
    }
}
