module.exports = (sequelize, Sequelize) => {

    const Producto = sequelize.define("Producto", {
        nombre_producto: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.DECIMAL
        },
        id_Producto: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Producto;
};