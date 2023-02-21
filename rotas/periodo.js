const express = require('express')
const path = require('path');

const periodo = express.Router({mergeParams: true})

const port = 3000;

// Parser JSON para o body
periodo.use(express.json());
periodo.use(express.urlencoded({ extended: true }));

const controllerPeriodo = require('../controles/periodo_controle');


// consuta 1 periodo pelo parâmetro id
periodo.get('/periodo/:id', function (req, res) { // :parametro diz que oq vai receber é um parâmetro
    
    let codigo = req.params.id;

    console.log('\nrecebida requisição get para periodo com código: '+codigo);
    //res.send('recebida requisição get para periodo com código: '+matricula);
  
    controllerPeriodo.read(codigo)
      .then(resultado => {
            //res.send(resultado);
            res.send('<h1>Consultando periodo código ' + resultado.codigo + '</h1>Nome: ' + resultado.nome);

            //res.send('achou');
        })
      .catch(erro => {
        console.log('Promise rejeitada: ' + erro);
        res.send(erro);
      })
      
});
  
periodo.get('/criar-periodo', function(req, res) {
  res.sendFile(path.join(__dirname, "../visoes/criar_periodo.html"));
});

// consulta todos os periodos
periodo
  .get('/periodos', function (req, res) {
    console.log('\nrecebida requisição get todos periodos ');
    //res.send('recebida get pra ver todos os periodos');
    
    controllerPeriodo.readAll()
    .then(resultado => {
        //res.send(resultado)
        var periodos = '<h1> Consultando todos os periodos </h1>';
        //console.log(resultado.length);

        for (var i = 0; i < resultado.length; i++) {
          periodoTemp = resultado[i];
          //console.log('aaaaaaaaaaa' + periodoTemp);

          periodos = periodos + 'Nome: ' + periodoTemp.nome;
        }

        res.send(periodos);
    })
    .catch(erro => {
        console.log('Promise rejeitada (periodo): ' + erro);
        res.send(erro);
    })
    

})
  // cria
  .post('/periodo', function (req, res) {
    console.log('recebida requisição create periodo');
    //console.log(req.body);

    controllerPeriodo.create(req.body)
      .then(resultado => {
        console.log(resultado);
        res.send('periodo inserida com sucesso')
      })
      .catch(erro => {
        console.log(erro);
        res.send(erro);
      })
    
  })
  
  // deleta
  .delete('/periodo/:id', function (req, res) {
    console.log('recebida requisição delete periodo :ID='+req.body.id);
    
    
    controllerPeriodo.delete(req.body.id)
      .then(resultado => {
        res.send('periodo removido com sucesso')
      })
    .catch(erro => {
      console.log(erro);
      res.send(erro);
    }) 
  })  

  // altera periodo
  .put('/periodo', function (req, res) {
    console.log('recebida requisição alterar periodo');
    
    /*
    controllerPeriodo.updateperiodo(req.body)
    .then(resultado => {
      res.send('periodo atualizado com sucesso')
    })
    .catch(erro => {
      console.log(erro);
      res.send(erro);
    }) */
    
  });  
  

module.exports = periodo