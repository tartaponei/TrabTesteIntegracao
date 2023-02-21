const Periodo = require('../modelos/periodo_modelo');
const express = require('express');

const Disciplina = require('../modelos/disciplina_modelo');
const disciplinaController = require("./disciplina_controle");

// Criação (Create)
exports.create = async (body) => {
    console.log(body);
    let { periodo, data_inicio, data_fim } = body;
    //console.log(periodo);

    codigo = periodo.replace(".", "");
    //console.log(codigo);

    try {
        let periodoTemp = await Periodo.create({ nome: periodo, codigo: codigo, data_inicio: data_inicio, data_fim: data_fim });
        console.log(periodoTemp);
        return periodoTemp; 
    } 
    catch (error) {
        return error;
    }
};

// Leitura (Read)
exports.read = async (codigo) => {
    console.log(codigo);
    try {
        const periodo = await Periodo.findByPk(codigo);
        console.log(periodo);
        if (!periodo) {
            //return res.status(404).send('periodo não encontrado');
            return('não tem');
        }
        return(periodo);
    } 
        catch (error) {
            return('erro');
            //res.status(500).send(error);
    }
};

// Leitura de todos (Read)
exports.readAll = async () => {
    try {
        const periodos = await Periodo.findAll();
        if (!periodos) {
            //return res.status(404).send('Aluno não encontrado');
            return('não tem');
        }
        return(periodos);
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
        const periodo = await Periodo.findByPk(req.params.id);
        if (!periodo) {
            return res.status(404).send('periodo não encontrado');
        }
        const { matricula, nome, data_nascimento, email } = req.body;
        await periodo.update({ matricula, nome, data_nascimento, email });
        res.send(periodo);
    } 
    catch (error) {
        res.status(500).send(error);
    }
};

// em andamento
// Exclusão (Delete)
exports.delete = async (codigo) => {
    try {
        const periodo = await Pperiodo.findByPk(codigo);
        if (!periodo) {
            return('periodo não encontrado');
        }
        await periodo.destroy();
        return('periodo excluído com sucesso');
    }
        catch (error) {
            return('erro');
    }
};