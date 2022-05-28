module.exports = (sequelize, Sequelize) => {
    const Mesa = require("./mesa.model.js")(sequelize, Sequelize);
    const Restaurante = require("./restaurante.model.js")(sequelize, Sequelize);
    const Cliente = require("./cliente.model.js")(sequelize, Sequelize);
    const Reserva = sequelize.define("Reserva", {
        restaurante_id: {
            type: Sequelize.INTEGER,
            references: {
                model: Restaurante,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        cliente_id: {
            type: Sequelize.INTEGER,
            references: {
                model: Cliente,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        mesa_id: {
            type: Sequelize.INTEGER,
            references: {
                model: Mesa,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        fecha: {
            type: Sequelize.DATEONLY
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        hora_inicio: {
            type: Sequelize.INTEGER,
        },
        hora_fin: {
            type: Sequelize.INTEGER,
        },
        cantidad: {
            type: Sequelize.INTEGER
        }
    });
    return Reserva;
};
