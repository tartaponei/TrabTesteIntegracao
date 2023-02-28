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
        //let ira = 0;

        //ira = await controllerAluno.calcularIRA(matricula);

        controllerAluno.calcularIRA(matricula).then(result => {
          iras = result;
          console.log(result);
          const ira = iras[0];
          const iraPeriodos = iras[1];
          let strPeriodos = '';
          console.log(JSON.stringify(iraPeriodos[0]));

          for (let i = 0; i < iraPeriodos.length; i++) {
            // isso pega as coisas do json e formata do jeito que eu quero
            strPeriodos +=  '<li>' + Object.keys(iraPeriodos[i])[0] + ': ' + iraPeriodos[i][Object.keys(iraPeriodos[i])[0]] + '</li>';
          }

          res.status(200).send('<h1>Consultando matrícula ' + resultado.matricula + '</h1>Nome: ' + resultado.nome + '<br> Matrícula: ' + resultado.matricula + '<br> Data de Nascimento: ' + resultado.data_nascimento + '<br> Email: ' + resultado.email + '<br><br> IRA geral: ' + ira + '<br><br> IRA dos períodos: <ul>' + strPeriodos + '</ul>');
        })
        }).catch(erro => {
          res.send(erro);
        })

      .catch(erro => {
        console.log('Promise rejeitada: ' + erro);
        res.send(erro);
      })
      
});
  
aluno.get('/criar-aluno', function(req, res) {
  res.sendFile(path.join(__dirname, "../visoes/criar_aluno.html"));
});

aluno.get('/excluir-aluno', function(req, res) {
  res.sendFile(path.join(__dirname, "../visoes/excluir_aluno.html"));
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

    // forçar erro
    controllerAluno.create(req.body)
      .then(resultado => {
        console.log(resultado);
        res.send(resultado)
      })
      .catch(erro => {
        console.log(erro);
        res.send(erro);
      })
    
  })

  aluno.get('/vincular-aluno-turma', function(req, res) {
    res.sendFile(path.join(__dirname, "../visoes/vincular_aluno_turma.html"));
  })


  .post('/vincular-aluno', function (req, res) {
    console.log('recebida requisição vincular aluno');
    //console.log(req.body);

    controllerAluno.vinculateTurma(req.body)
      .then(resultado => {
        console.log(resultado);
        res.send(resultado)
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