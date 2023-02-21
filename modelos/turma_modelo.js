const { Sequelize, Model, DataTypes } = require('sequelize');
const Disciplina = require('./disciplina_modelo');
const Periodo = require('./periodo_modelo');
const sequelize = new Sequelize('teste_integracao', 'root', '',
    {dialect: 'mysql', 
    host: 'localhost'});

//const Disciplina = require('./disciplina_modelo');
/* const Periodo = require('./periodo_modelo');
const Aluno = require('./aluno_modelo');
const Aluno_Turma = require('./aluno_turma_modelo'); */

class Turma extends Model {
    static associate(models) {
        Turma.hasOne(models.Disciplina, {foreignKey: 'cod_disciplina'});
        Turma.belongsToMany(models.Aluno, { through: models.Aluno_Turma });
        Turma.hasOne(models.Periodo, {foreignKey: 'periodo'});
        Turma.belongsTo(models.Aluno_Turma);
    }
}

Turma.init({

    codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },

    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    professor: {
        type: DataTypes.STRING,
        allowNull: true
    },

    id_disciplina: {
        type: DataTypes.INTEGER,
        allowNull: false,

        references: {model: Disciplina, key: 'id'}
    },

    sala: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    horario: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'por enquanto, código do sigaa (246-T-23)'
    },

    periodo: {
        type: DataTypes.INTEGER, // 20221 -> 2022.1 pq vai ser chave primaria
        allowNull: false,
        comment: '20221 é o código pro período 2022.1, chave tem que ser int',
        
        references: {model: Periodo, key: 'codigo'}
    }

}, { sequelize: sequelize, modelName: 'turma' });

module.exports = Turma;