module.exports = (sequelize, Sequelize) => {
    const Cliente = require("./cliente.model.js")(sequelize, Sequelize);
    const Mesa = require("./mesa.model.js")(sequelize, Sequelize);
    const Consumo = sequelize.define("Consumo", {
        id_cliente: {
            type: Sequelize.INTEGER,
            references: {
                model: Cliente,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        id_mesa: {
            type: Sequelize.INTEGER,
            references: {
                model: Mesa,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        estado: {
            type: Sequelize.STRING,
            defaultValue: "Abierto"
        },
        total: {
            type: Sequelize.INTEGER
        },
        horafecha_creacion: {
            type: Sequelize.DATE
        },
        horafecha_cierre: {
            type: Sequelize.DATE
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Consumo;
};
