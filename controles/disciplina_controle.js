const Disciplina = require('../modelos/aluno_modelo');
const express = require('express');
const app = express();
const mysql = require('mysql2');

// Criação (Create)
exports.create = async (body) => {
    console.log(body);
    let { codigo, departamento, nome, carga_horaria } = body;
    //console.log(data_nascimento);
    //data_nascimento = String(data_nascimento);

    try {
        let disciplina = await Disciplina.create({ codigo, departamento, nome, carga_horaria });
        //console.log(disciplina);
        return disciplina;
    } 
    catch (error) {
        return error;
    }
};

// Leitura (Read)
exports.read = async (codigo) => {
    console.log(codigo);
    try {
        const disicplina = await Disciplina.findByPk(codigo);
        console.log(disicplina);
        if (!disicplina) {
            //return res.status(404).send('disicplina não encontrado');
            return('não tem');
        }
        return(disicplina);
    } 
        catch (error) {
            return('erro');
            //res.status(500).send(error);
    }
};

// Leitura de todos (Read)
exports.readAll = async () => {
    try {
        const disicplinas = await Disciplina.findAll();
        if (!disicplinas) {
            //return res.status(404).send('Aluno não encontrado');
            return('não tem');
        }
        return(disicplinas);
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
        const disciplina = await Disciplina.findByPk(req.params.id);
        if (!disciplina) {
            return res.status(404).send('disciplina não encontrado');
        }
        const { matricula, nome, data_nascimento, email } = req.body;
        await disciplina.update({ matricula, nome, data_nascimento, email });
        res.send(disciplina);
    } 
    catch (error) {
        res.status(500).send(error);
    }
};

// em andamento
// Exclusão (Delete)
exports.delete = async (codigo) => {
    try {
        const disciplina = await Disciplina.findByPk(codigo);
        if (!disciplina) {
            return('disciplina não encontrado');
        }
        await disciplina.destroy();
        return('disciplina excluído com sucesso');
    }
        catch (error) {
            return('erro');
    }
};