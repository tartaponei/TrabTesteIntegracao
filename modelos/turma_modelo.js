const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('teste_integracao', 'root', '',
    {dialect: 'mysql', 
    host: 'localhost'});

class Turma extends Model {}

Turma.init({

    codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
    },

    professor: {
        type: DataTypes.STRING,
        allowNull: true
    },

    cod_disciplina: {
        type: DataTypes.INTEGER,
        allowNull: false,

        references: {
            model: Disciplina,
            key: 'codigo'
        }
    },

    sala: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    horario: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'por enquanto, código do sigaa (246-T-23)'
    }
}, { sequelize, modelName: 'turma' });

module.exports = Turma;