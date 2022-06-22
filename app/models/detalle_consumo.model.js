module.exports = (sequelize, Sequelize) => {
    const Consumo = require("./consumo.models.js")(sequelize, Sequelize);
    const Producto = require("./producto.model.js")(sequelize, Sequelize);
    const Detalle = sequelize.define("Detalle", {
        id_cabecera: {
            type: Sequelize.INTEGER,
            references: {
                model: Consumo,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        id_producto: {
            type: Sequelize.INTEGER,
            references: {
                model: Producto,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Detalle;
};
