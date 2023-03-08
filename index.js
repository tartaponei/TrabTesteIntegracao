const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('teste_integracao', 'root', '',
    {dialect: 'mysql', 
    host: 'localhost'}
);

// uso dos modelos
const Aluno = require('./modelos/aluno_modelo');
const Disciplina = require('./modelos/disciplina_modelo');
const Turma = require('./modelos/turma_modelo');

// config express e porta
const express = require('express')
const port = 3000
const app = express();
app.listen(3000, ()=>{
    console.log('Funciona');
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))


// uso das rotas
var aluno = require('./rotas/aluno');
app.use('/', aluno);

var disciplina = require('./rotas/disciplina');
app.use('/', disciplina);

var periodo = require('./rotas/periodo');
app.use('/', periodo);

var turma = require('./rotas/turma');
const Aluno_Turma = require('./modelos/aluno_turma_modelo');
const Periodo = require('./modelos/periodo_modelo');
app.use('/', turma);


// sync com as tabelas
Aluno.sync();
Aluno_Turma.sync();
Disciplina.sync();
Turma.sync();
Periodo.sync();

//Aluno.sync({force: true});
//Turma.sync({force: true});
//Periodo.sync({force: true});
//Aluno_Turma.sync({force: true});
//Disciplina.sync({force: true});

// teste de conexão
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} 
catch (error) {
    console.error('Unable to connect to the database:', error);
}


//Aluno.read(43947837498);

//Aluno.create({matricula: 43947837498, nome: 'joão', data_nascimento: '2002-03-12', email: 'joao@joao.com'});

module.exports = app;