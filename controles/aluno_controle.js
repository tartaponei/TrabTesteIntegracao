const Aluno = require('../modelos/aluno_modelo');
const express = require('express');
const app = express();
const mysql = require('mysql2');

function validarNascimento(data) {
    if (data > '2007-01-01' || data < '1920-12-31') {
        return "Data de nascimento inválida"
    }
    return 1;
}

function validarMatricula(matricula, ano_entrada) {
    if(matricula.slice(0, 4) != matricula) {
        return "Matrícula não condiz com ano de entrada do aluno"
    }
    return 1;
}

// Criação (Create)
exports.create = async (body) => {
    console.log(body);
    let { nome, matricula, data_nascimento, email, ano_entrada } = body;
    console.log(data_nascimento);
    data_nascimento = String(data_nascimento);

    try {
        let aluno = await Aluno.create({ nome, matricula, data_nascimento, email, ano_entrada });
        //console.log(aluno);
        return aluno;
    } 
    catch (error) {
        return error;
    }
};

// Leitura (Read)
exports.read = async (matricula) => {
    console.log(matricula);
    try {
        const aluno = await Aluno.findByPk(matricula);
        console.log(aluno);
        if (!aluno) {
            //return res.status(404).send('Aluno não encontrado');
            return('não tem');
        }
        return(aluno);
    } 
        catch (error) {
            return('erro');
            //res.status(500).send(error);
    }
};

// Leitura de todos (Read)
exports.readAll = async () => {
    try {
        const alunos = await Aluno.findAll();
        if (!alunos) {
            //return res.status(404).send('Aluno não encontrado');
            return('não tem');
        }
        return(alunos);
    } 
        catch (error) {
            return('erro');
            //res.status(500).send(error);
    }
};

// nao implementado ainda
// Atualização (Update)
exports.update = async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id);
        if (!aluno) {
            return res.status(404).send('Aluno não encontrado');
        }
        const { matricula, nome, data_nascimento, email } = req.body;
        await aluno.update({ matricula, nome, data_nascimento, email });
        res.send(aluno);
    } 
    catch (error) {
        res.status(500).send(error);
    }
};

// em andamento
// Exclusão (Delete)
exports.delete = async (matricula) => {
    try {
        const aluno = await Aluno.findByPk(matricula);
        if (!aluno) {
            return('Aluno não encontrado');
        }
        await aluno.destroy();
        return('Aluno excluído com sucesso');
    }
        catch (error) {
            return('erro');
    }
};