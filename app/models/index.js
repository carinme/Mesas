const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//Relaciones del TP 2doParcial - BackEnd
db.Restaurantes = require("./restaurante.model.js")(sequelize, Sequelize);
db.Clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.Mesas = require("./mesa.models.js")(sequelize, Sequelize);
db.Reservas = require("./reserva.model.js")(sequelize, Sequelize);
db.Horas_Reservas = require("./horas_reserva.model.js")(sequelize, Sequelize);

///Relaciones del TP 1erFinal - BackEnd
db.Categorias = require("./categoria.model.js")(sequelize, Sequelize);
db.Productos = require("./producto.model.js")(sequelize,Sequelize);
db.Consumos=require("./consumo.models.js")(sequelize, Sequelize);
db.Detalles = require("./detalle_consumo.model.js")(sequelize, Sequelize);
module.exports = db;


db.Restaurantes.hasMany(db.Mesas, {
  foreignKey: 'restaurante_id',
  sourceKey: 'id',
});

db.Restaurantes.hasMany(db.Reservas, {
  foreignKey: 'restaurante_id',
  sourceKey: 'id',
});

db.Reservas.hasMany(db.Horas_Reservas, {
  foreignKey: 'reserva_id',
  sourceKey: 'id',
});

db.Mesas.hasMany(db.Reservas, {
  foreignKey: 'mesa_id',
  sourceKey: 'id',
});

db.Clientes.hasMany(db.Reservas, {
  foreignKey: 'cliente_id',
  sourceKey: 'id',
});





db.Mesas.belongsTo(db.Restaurantes, {
  foreignKey: "restaurante_id",
  targetKey: 'id',
  onDelete: 'CASCADE',
});

db.Reservas.belongsTo(db.Restaurantes, {
  foreignKey: "restaurante_id",
  targetKey: 'id',
  onDelete: 'CASCADE',
});

db.Horas_Reservas.belongsTo(db.Reservas,{
  foreignKey: 'reserva_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
});

db.Reservas.belongsTo(db.Mesas, {
  foreignKey: "mesa_id",
  targetKey: 'id',
  onDelete: 'CASCADE',
});

db.Reservas.belongsTo(db.Clientes, {
  foreignKey: "cliente_id",
  targetKey: 'id',
  onDelete: 'CASCADE',
});


