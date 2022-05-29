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
        posicion_x: {
            type: Sequelize.INTEGER,
            validate: {
                min: {
                    args: 1,
                    msg: "El eje x debe de ser mayor a 1"
                },
                isInt: true,
            }
        },
        posicion_y: {
            type: Sequelize.INTEGER,
            validate: {
                min: {
                    args: 1,
                    msg: "El eje y debe de ser mayor a 1"
                },
                isInt: true,
            }
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        planta: {
            type: Sequelize.INTEGER,
            validate: {
                min: {
                    args: 1,
                    msg: "La planta debe ser mayor a 0"
                },
                isInt: true,
            },
            defaultValue: 1
        },
        capacidad: {
            type: Sequelize.INTEGER,
            validate: {
                min: {
                    args: 1,
                    msg: "La capacidad debe ser mayor a 0"
                },
                isInt: true,
            }
        },
        estado: {
            type: Sequelize.STRING,
            defaultValue: "abierto",
            isIn: [['abierto', 'cerrado']]
        }
    });
    
    return Mesa;
};

