module.exports = (sequelize, Sequelize) => {

    const Reserva = sequelize.define("Reserva", {
        cantidad: {
            type: Sequelize.INTEGER
        },
        rango_hora_inicio: {
            type: Sequelize.INTEGER
        },
        rango_hora_fin: {
            type: Sequelize.INTEGER
        },
        fecha: {
            type: Sequelize.DATE
        },
        id_Reserva: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Reserva;
};