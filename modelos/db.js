const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize('teste_integracao', 'root', '',
    {dialect: 'mysql', 
    host: 'localhost'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;