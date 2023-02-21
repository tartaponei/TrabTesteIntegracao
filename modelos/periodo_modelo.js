const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('teste_integracao', 'root', '',
    {dialect: 'mysql', 
    host: 'localhost'});

class Periodo extends Model {
    static associate(models) {
        Periodo.belongsTo(models.Turma);
    }
}

Periodo.init({
    codigo: {
        type: DataTypes.INTEGER, // 20221 -> 2022.1 pq vai ser chave primaria
        allowNull: false,
        primaryKey: true,
        unique: true,
        comment: '20221 é o código pro período 2022.1, chave tem que ser int'
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    data_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

    data_fim: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
}, { sequelize, modelName: 'periodo' });

module.exports = Periodo;