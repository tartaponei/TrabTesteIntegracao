const Turma = require('../modelos/turma_modelo');
const express = require('express');

const Disciplina = require('../modelos/disciplina_modelo');
const disciplinaController = require("../controles/disciplina_controle");

exports.findTurma = async(numero, codigoDisc) => {
    const result = await disciplinaController.findDisciplinaId(codigoDisc);
    //console.log(result);
    let disc = result[0].id;
    console.log(disc);

    let turma = await (Turma.findAll({
        attributes: ['codigo'],
        where: {
            numero: numero,
            id_disciplina: disc
        }
    }));

    console.log(turma[0].codigo);

    return turma[0].codigo;
}

// Criação (Create)
exports.create = async (body) => {
    console.log(body);
    let { cod_disciplina, num_turma, professor, sala, horario, periodo } = body;
    console.log("numero: " + num_turma);
    console.log("professor: " + professor);
    console.log("sala: " + sala);
    console.log("horario: " + horario);
    console.log("periodo: " + periodo);
    
    try {
        let disciplina = await disciplinaController.findDisciplinaId(cod_disciplina);
        disc = disciplina[0];
        idDisc = disc.id;

        //idDisc = 1;
        console.log(idDisc);
    }
    catch (error) {
        console.log('nao leu');
    }

    let turma = await Turma.create({ numero: num_turma, professor: professor, id_disciplina: idDisc, sala: sala, horario: horario, periodo: periodo });
        console.log(turma);
        return "Turma inserida"; 
};

// Leitura (Read)
exports.read = async (codigo) => {
    console.log(codigo);
    try {
        const turma = await Turma.findByPk(codigo);
        console.log(turma);
        if (!turma) {
            //return res.status(404).send('turma não encontrado');
            return('não tem');
        }
        return(turma);
    } 
        catch (error) {
            return('erro');
            //res.status(500).send(error);
    }
};

// Leitura de todos (Read)
exports.readAll = async () => {
    try {
        const turmas = await Turma.findAll();
        if (!turmas) {
            //return res.status(404).send('Aluno não encontrado');
            return('não tem');
        }
        return(turmas);
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
        const turma = await Turma.findByPk(req.params.id);
        if (!turma) {
            return res.status(404).send('turma não encontrado');
        }
        const { matricula, nome, data_nascimento, email } = req.body;
        await turma.update({ matricula, nome, data_nascimento, email });
        res.send(turma);
    } 
    catch (error) {
        res.status(500).send(error);
    }
};

// em andamento
// Exclusão (Delete)
exports.delete = async (codigo) => {
    try {
        const turma = await Turma.findByPk(codigo);
        if (!turma) {
            return('turma não encontrado');
        }
        await turma.destroy();
        return('turma excluído com sucesso');
    }
        catch (error) {
            return('erro');
    }
};