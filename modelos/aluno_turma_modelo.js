const { Sequelize, Model, DataTypes } = require('sequelize');
const Aluno = require('./aluno_modelo');
const Turma = require('./turma_modelo');
const sequelize = new Sequelize('teste_integracao', 'root', '',
    {dialect: 'mysql', 
    host: 'localhost'});

class Aluno_Turma extends Model {
    static associate(models) {
        Aluno_Turma.hasOne(models.Aluno, {foreignKey: 'matricula_aluno'});
        Aluno_Turma.hasOne(models.Turma, {foreignKey: 'cod_turma'});
    }
}

Aluno_Turma.init({
    matricula_aluno: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,

        references: { model: Aluno , key: 'matricula' }
    },

    cod_turma: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,

        references: { model: Turma, key: 'codigo' }
    },

    nota: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }, 
    
    resultado: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, { sequelize: sequelize, modelName: 'aluno_turma' });

module.exports = Aluno_Turma;