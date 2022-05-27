//const { sequelize, Sequelize } = require(".");

models.exports = ( sequelize, Sequelize) => {
    
    const Categoria = sequelize.define("Categoria", {
        nombre_categoria: {
            type: Sequelize.STRING
        },
        id_Categoria: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Categoria;
};