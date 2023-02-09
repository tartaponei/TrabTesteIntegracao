const express = require('express')

const turma = express.Router({mergeParams: true})

// Parser JSON para o body
turma.use(express.json());
turma.use(express.urlencoded({ extended: true }));

//const controllerTurma = require('../controles/turma_controle');


// consuta 1 turma pelo parâmetro id
turma.get('/turma/:id', function (req, res) { // :parametro diz que oq vai receber é um parâmetro
    
    let codigo = req.params.id;
    console.log("recebida requisição get para turma com código da turma: "+codigo);
    res.send("recebida requisição get para turma com código da turma: "+codigo);
  
/*    controllerTurma.getTurma(codigo)
      .then(resultado => {
            res.send(resultado)
        })
      .catch(erro => {
        console.log("Promise rejeitada: " + erro);
        res.send(erro);
      })
*/      
});
  

// consulta todos os turmas
turma
  .get('/turma/', function (req, res) {
    console.log("recebida requisição get todas turmas ");
    /*controllerTurma.getTodasTurmas()
    .then(resultado => {
        res.send(resultado)
    })
    .catch(erro => {
        console.log("Promise rejeitada (turma): " + erro);
        res.send(erro);
    })
    */

})
    
  .post('/turma', function (req, res) {
    console.log("recebida requisição create turma");
    /*
    controllerTurma.createTurma(req.body)
    .then(resultado => {
      res.send("turma inserida com sucesso")
    })
    .catch(erro => {
      console.log(erro);
      res.send(erro);
    })
    */
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