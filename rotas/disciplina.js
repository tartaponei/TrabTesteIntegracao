const express = require('express')
const path = require('path');

const disciplina = express.Router({mergeParams: true})

const port = 3000;

// Parser JSON para o body
disciplina.use(express.json());
disciplina.use(express.urlencoded({ extended: true }));

const controllerDisciplina = require('../controles/disciplina_controle');


// consuta 1 disciplina pelo parâmetro id
disciplina.get('/disciplina/:id', function (req, res) { // :parametro diz que oq vai receber é um parâmetro
    
    let codigo = req.params.id;

    console.log('\nrecebida requisição get para disciplina com código: '+codigo);
    //res.send('recebida requisição get para disciplina com código: '+matricula);
  
    controllerDisciplina.read(codigo)
      .then(resultado => {
            //res.send(resultado);
            res.send('<h1>Consultando disciplina código ' + resultado.codigo + '</h1>Nome: ' + resultado.nome + '<br> Departamento: ' + resultado.departamento + '<br> Carga Horária: ' + resultado.carga_horaria);

            //res.send('achou');
        })
      .catch(erro => {
        console.log('Promise rejeitada: ' + erro);
        res.send(erro);
      })
      
});
  
disciplina.get('/criar-disciplina', function(req, res) {
  res.sendFile(path.join(__dirname, "../visoes/criar_disciplina.html"));
});

// consulta todos os disciplinas
disciplina
  .get('/disciplinas', function (req, res) {
    console.log('\nrecebida requisição get todos disciplinas ');
    //res.send('recebida get pra ver todos os disciplinas');
    
    controllerDisciplina.readAll()
    .then(resultado => {
        //res.send(resultado)
        var disciplinas = '<h1> Consultando todos os disciplinas </h1>';
        //console.log(resultado.length);

        for (var i = 0; i < resultado.length; i++) {
          disciplinaTemp = resultado[i];
          //console.log('aaaaaaaaaaa' + disciplinaTemp);

          disciplinas = disciplinas + 'Nome: ' + disciplinaTemp.nome + '<br> Código: ' + disciplinaTemp.codigo + '<br> Carga Horária: ' + disciplinaTemp.carga_horaria + '<br> Departamento: ' + disciplinaTemp.departamento + '<br> <br>'
        }

        res.send(disciplinas);
    })
    .catch(erro => {
        console.log('Promise rejeitada (disciplina): ' + erro);
        res.send(erro);
    })
    

})
  // cria
  .post('/disciplina', function (req, res) {
    console.log('recebida requisição create disciplina');
    //console.log(req.body);

    controllerDisciplina.create(req.body)
      .then(resultado => {
        console.log(resultado);
        res.send('Disciplina inserida com sucesso')
      })
      .catch(erro => {
        console.log(erro);
        res.send(erro);
      })
    
  })
  
  // deleta
  .delete('/disciplina/:id', function (req, res) {
    console.log('recebida requisição delete disciplina :ID='+req.body.id);
    
    
    controllerDisciplina.delete(req.body.id)
      .then(resultado => {
        res.send('disciplina removido com sucesso')
      })
    .catch(erro => {
      console.log(erro);
      res.send(erro);
    }) 
  })  

  // altera disciplina
  .put('/disciplina', function (req, res) {
    console.log('recebida requisição alterar disciplina');
    
    /*
    controllerDisciplina.updatedisciplina(req.body)
    .then(resultado => {
      res.send('disciplina atualizado com sucesso')
    })
    .catch(erro => {
      console.log(erro);
      res.send(erro);
    }) */
    
  });  
  

module.exports = disciplina