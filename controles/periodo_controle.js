const Periodo = require('../modelos/periodo_modelo');
const express = require('express');

function validarPeriodo(data_inicio, data_fim) {
    data_inicio = new Date(data_inicio);
    data_fim = new Date(data_fim);

    console.log(data_inicio);
    console.log(data_fim);

    console.log((data_fim - data_inicio) / (1000 * 60 * 60 * 24));

    if ((data_fim - data_inicio) / (1000 * 60 * 60 * 24) < 90) return false;
    return true;
}

// Criação (Create)
exports.create = async (body) => {
    console.log(body);
    let { periodo, data_inicio, data_fim } = body;
    //console.log(periodo);

    codigo = periodo.replace(".", "");
    //console.log(codigo);

    try {
        if (!validarPeriodo(data_inicio, data_fim)) return "Perído possui menos de 90 dias";

        let periodoTemp = await Periodo.create({ nome: periodo, codigo: codigo, data_inicio: data_inicio, data_fim: data_fim });
        console.log(periodoTemp);
        return "Período inserido"; 
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
exports.update = async (body) => {
    const {codigo, data_inicio, data_fim} = body;
    try {
        const periodo = await Periodo.findByPk(codigo);
        if (!periodo) {
            return 'periodo não encontrado';
        }
        await periodo.update({ codigo, data_inicio, data_fim });
        return 'periodo alterado';
    } 
    catch (error) {
       return error;;
    }
};

// em andamento
// Exclusão (Delete)
exports.delete = async (codigo) => {
    try {
        const periodo = await Periodo.findByPk(codigo);
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