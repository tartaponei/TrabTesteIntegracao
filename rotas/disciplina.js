const express = require('express');

const disciplina = express.Router({mergeParams: true});

// Parser JSON para o body
turma.use(express.json());
turma.use(express.urlencoded({ extended: true }));

// const controllerTurma = require('../controllers/turma_controle');

// consulta uma disciplina
disciplina.get('/disciplina/:id', function (req, res) {
    let codigo = req.params.id;
    console.log("recebida requisição pra consultar uma disciplina pelo código ", +codigo);
    res.send("recebida requisição pra consultar uma disciplina pelo código ", +codigo);
})

// consulta todas as disciplinas
disciplina.get('/disciplina', function (req, res) {
    console.log("recebida requisição pra consutar todas as disciplinas");
    res.send("recebida requisição pra consutar todas as disciplinas");
})

// insere uma disciplina
disciplina.post('/disciplina', function (req, res) {
    console.log("recebida requisição pra criar uma disciplina");
});

disciplina.delete('/disciplina/:id', function (req, res) {
    let codigo = req.params.id;
    console.log("recebida requsição pra deletar a disciplina com código ", +codigo);
});

disciplina.put('/disciplina', function (req, res) {
    console.log("recebida requisição pra alterar disciplina")
});