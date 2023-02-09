const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('teste_integracao', 'root', '',
    {dialect: 'mysql', 
    host: 'localhost'});

class Disciplina extends Model {}

Disciplina.init({
    codigo: {
        type: DataTypes.STRING(5),
        allowNull: false,
        unique: true,
        primaryKey: true
    },

    departamento: {
        type: DataTypes.STRING,
        allowNull: false
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    carga_horaria: {
        type: DataTypes.INTEGER, // 30h, 60h, 90h
        allowNull: false
    }
}, { sequelize, modelName: 'disiplina' });

module.exports = Disciplina;