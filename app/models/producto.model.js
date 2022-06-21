module.exports = (sequelize, Sequelize) => {
    const Categoria = require("./categoria.model.js")(sequelize, Sequelize);
    const Producto = sequelize.define("Producto", {
        categoria_id: {
            type: Sequelize.INTEGER,
            references: {
                model: Categoria,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        nombre: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.INTEGER
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Producto;
};
