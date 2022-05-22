const { uniqueId } = require("lodash");

module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", {
    cedula: {    
        type: Sequelize.STRING,
        unique: true
    },
    nombre: {
        type: Sequelize.STRING
    },
    apellido:{
        type: Sequelize.STRING
    },
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    }
    });
    return Cliente; 
};