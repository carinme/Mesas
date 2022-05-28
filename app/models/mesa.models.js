module.exports = (sequelize, Sequelize) => {
    const Restaurante = require("./restaurante.model.js")(sequelize, Sequelize);
    const Mesa = sequelize.define("Mesa", {
        nombre: {
            type: Sequelize.STRING
        },
        restaurante_id: {
            type: Sequelize.INTEGER,
            references: {
                model: Restaurante,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        posicion: {
            type: Sequelize.STRING
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        planta: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
        capacidad: {
            type: Sequelize.INTEGER
        },
        estado: {
            type: Sequelize.STRING,
            defaultValue: "Abierto"
        }
    });
    
    return Mesa;
};

