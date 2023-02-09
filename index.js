const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('teste_integracao', 'root', '',
    {dialect: 'mysql', 
    host: 'localhost'}
);

const Aluno = require('./modelos/aluno_modelo');

const express = require('express')
const port = 3000
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

var aluno = require('./rotas/aluno');
app.use('/', aluno);

app.listen(3000, ()=>{
    console.log('Funciona');
})

//const Aluno = require('./modelos/aluno_modelo');
//const Aluno = require('./controles/aluno_controle');

Aluno.sync({force: true});

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