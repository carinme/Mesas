module.exports = (sequelize, Sequelize) => {
    const Reserva = require("./reserva.model.js")(sequelize, Sequelize);
    const Horas_Reserva = sequelize.define("Horas_Reserva", {
        reserva_id: {
            type: Sequelize.INTEGER,
            references: {
                model: Reserva,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
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
    });
    return Horas_Reserva;
};
