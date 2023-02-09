const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('teste_integracao', 'root', '',
    {dialect: 'mysql', 
    host: 'localhost'});

class Aluno_Turma extends Model {}

Aluno_Turma.init({
    matricula_aluno: {
        type: DataTypes.INTEGER(11),
        allowNull: false,

        references: {
            model: Aluno,
            key: 'matricula'
        }
    },

    cod_turma: {
        type: DataTypes.INTEGER,
        allowNull: false,

        references: {
            model: Turma,
            key: 'codigo'
        }
    },

    nota: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }, 
    
    resultado: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, { sequelize, modelName: 'aluno_turma' });

module.exports = Aluno_Turma;