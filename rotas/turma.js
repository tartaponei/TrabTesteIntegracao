const express = require('express')
const path = require('path');

const turma = express.Router({mergeParams: true})

// Parser JSON para o body
turma.use(express.json());
turma.use(express.urlencoded({ extended: true }));

const controllerTurma = require('../controles/turma_controle');


// consuta 1 turma pelo parâmetro id
turma.get('/turma/:id', function (req, res) { // :parametro diz que oq vai receber é um parâmetro
    
    let codigo = req.params.id;
    console.log("recebida requisição get para turma com código da turma: "+codigo);
  
    controllerTurma.read(codigo)
      .then(resultado => {
            res.send('<h1>Consultando turma código geral ' + resultado.codigo + '</h1>Id disciplina: ' + resultado.id_disciplina + '<br></h1>Número: ' + resultado.numero + '<br>Sala: ' + resultado.sala + '<br>Professor: ' + resultado.professor + '<br>Horário: ' + resultado.horario + '<br>Período: ' + resultado.periodo);
        })
      .catch(erro => {
        console.log("Promise rejeitada: " + erro);
        res.send(erro);
      })
});

turma.get('/criar-turma', function (req, res) {
  res.sendFile(path.join(__dirname, "../visoes/criar_turma.html"));
});
  

// consulta todos os turmas
turma
  .get('/turmas', function (req, res) {
    console.log("recebida requisição get todas turmas ");
    controllerTurma.readAll()
    .then(resultado => {
      var turmas = '<h1> Consultando todos as turmas </h1>';
      console.log(resultado.length);
      console.log(resultado);

      for (var i = 0; i < resultado.length; i++) {
        let turmaTemp = resultado[i];

        turmas = turmas + 'Id disciplina: ' + turmaTemp.id_disciplina + '<br></h1>Número: ' + turmaTemp.numero + '<br>Sala: ' + turmaTemp.sala + '<br>Professor: ' + turmaTemp.professor + '<br>Horário: ' + turmaTemp.horario + '<br>Período: ' + turmaTemp.periodo;
      }

      res.send(turmas);

    })
    .catch(erro => {
        console.log("Promise rejeitada (turma): " + erro);
        res.send(erro);
    })

})
    
//cria
  .post('/turma', function (req, res) {
    console.log("recebida requisição create turma");

    controllerTurma.create(req.body)
    .then(resultado => {
      res.send(resultado)
    })
    .catch(erro => {
      console.log(erro);
      res.send(erro);
    })
  })
  
  // deleta
  .delete('/turma/:id', function (req, res) {
    console.log("recebida requisição delete turma :ID="+req.body.id);
    
    /*
    controllerTurma.deleteTurma(req.body.id)
    .then(resultado => {
      res.send("turma removido com sucesso")
    })
    .catch(erro => {
      console.log(erro);
      res.send(erro);
    }) */
  })  

  // altera turma
  .put('/turma', function (req, res) {
    console.log("recebida requisição alterar turma");
    
    /*
    controllerTurma.updateTurma(req.body)
    .then(resultado => {
      res.send("turma atualizado com sucesso")
    })
    .catch(erro => {
      console.log(erro);
      res.send(erro);
    }) */
    
  });  
  

module.exports = turma