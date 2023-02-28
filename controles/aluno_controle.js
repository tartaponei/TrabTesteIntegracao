const Aluno = require('../modelos/aluno_modelo');
const express = require('express');
const app = express();
const mysql = require('mysql2');

function validarNascimento(data) {
    console.log("entrei");
    const maximo = new Date('2007-01-01');
    const minimo = new Date('1920-12-31');
    data = new Date(data);

    maximo.setHours(0,0,0,0);
    minimo.setHours(0,0,0,0);

    //console.log(data > maximo);
    if (data > maximo || data < minimo) return false;
    return true;
}

function validarMatricula(matricula, ano_entrada) {
    if(matricula.slice(0, 4) != ano_entrada) return false;
    return true;
}

// Criação (Create)
exports.create = async (body) => {
    console.log(body);
    let { nome, matricula, data_nascimento, email, ano_entrada } = body;
    //console.log(data_nascimento);
    data_nascimento = String(data_nascimento);

    //console.log("resultado: " + validarNascimento(data_nascimento));

    try {
        if (!validarNascimento(data_nascimento)) return "Data fora dos limites";
        if (!validarMatricula(matricula, ano_entrada)) return "Matrícula não corresponde ao ano de entrada";
        
        let aluno = await Aluno.create({ nome, matricula: matricula, data_nascimento, email, ano_entrada });
        console.log(aluno);
        return "Aluno inserido";
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