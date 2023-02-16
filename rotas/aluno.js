const express = require('express')
const path = require('path');

const aluno = express.Router({mergeParams: true})

const port = 3000;

// Parser JSON para o body
aluno.use(express.json());
aluno.use(express.urlencoded({ extended: true }));

const controllerAluno = require('../controles/aluno_controle');


// consuta 1 aluno pelo parâmetro id
aluno.get('/aluno/:id', function (req, res) { // :parametro diz que oq vai receber é um parâmetro
    
    let matricula = req.params.id;

    console.log('\nrecebida requisição get para aluno com matrícula: '+matricula);
    //res.send('recebida requisição get para aluno com matrícula: '+matricula);
  
    controllerAluno.read(matricula)
      .then(resultado => {
            //res.send(resultado);
            res.send('<h1>Consultando matrícula ' + resultado.matricula + '</h1>Nome: ' + resultado.nome + '<br> Matrícula: ' + resultado.matricula + '<br> Data de Nascimento: ' + resultado.data_nascimento + '<br> Email: ' + resultado.email);

            //res.send('achou');
        })
      .catch(erro => {
        console.log('Promise rejeitada: ' + erro);
        res.send(erro);
      })
      
});
  
aluno.get('/criar-aluno', function(req, res) {
  res.sendFile(path.join(__dirname, "../visoes/criar_aluno.html"));
});

// consulta todos os alunos
aluno
  .get('/alunos', function (req, res) {
    console.log('\nrecebida requisição get todos alunos ');
    //res.send('recebida get pra ver todos os alunos');
    
    controllerAluno.readAll()
    .then(resultado => {
        //res.send(resultado)
        var alunos = '<h1> Consultando todos os alunos </h1>';
        //console.log(resultado.length);

        for (var i = 0; i < resultado.length; i++) {
          alunoTemp = resultado[i];
          //console.log('aaaaaaaaaaa' + alunoTemp);

          alunos = alunos + 'Nome: ' + alunoTemp.nome + '<br> Matrícula: ' + alunoTemp.matricula + '<br> Data de Nascimento: ' + alunoTemp.data_nascimento + '<br> Email: ' + alunoTemp.email + '<br> <br>'
        }

        res.send(alunos);
    })
    .catch(erro => {
        console.log('Promise rejeitada (aluno): ' + erro);
        res.send(erro);
    })
    

})
  // cria
  .post('/aluno', function (req, res) {
    console.log('recebida requisição create aluno');
    //console.log(req.body);

    controllerAluno.create(req.body)
      .then(resultado => {
        console.log(resultado);
        res.send('Aluno inserido com sucesso')
      })
      .catch(erro => {
        console.log(erro);
        res.send(erro);
      })
    
  })
  
  // deleta
  .delete('/aluno/:id', function (req, res) {
    console.log('recebida requisição delete aluno :ID='+req.body.id);
    
    
    controllerAluno.delete(req.body.id)
      .then(resultado => {
        res.send('Aluno removido com sucesso')
      })
    .catch(erro => {
      console.log(erro);
      res.send(erro);
    }) 
  })  

  // altera aluno
  .put('/aluno', function (req, res) {
    console.log('recebida requisição alterar aluno');
    
    /*
    controllerAluno.updateAluno(req.body)
    .then(resultado => {
      res.send('Aluno atualizado com sucesso')
    })
    .catch(erro => {
      console.log(erro);
      res.send(erro);
    }) */
    
  });  
  

module.exports = aluno