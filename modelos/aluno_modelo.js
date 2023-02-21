const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('teste_integracao', 'root', '',
    {dialect: 'mysql', 
    host: 'localhost'});

class Aluno extends Model {
    static associate(models) {
        Aluno.belongsToMany(models.Turma, {through: models.Aluno_Turma});
        //Aluno.belongsTo(models.Aluno_Turma);
    }
}

Aluno.init({
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    matricula: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        unique: true,
        primaryKey: true
    },

    data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: true
    },

    ano_entrada: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{ sequelize: sequelize, modelName: 'aluno' });

module.exports = Aluno;