const Aluno = require('../modelos/aluno_modelo');
const Aluno_Turma = require('../modelos/aluno_turma_modelo');
const turmaController = require('../controles/turma_controle');
disciplinaController = require('../controles/disciplina_controle')
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');
const db = require('../modelos/db');

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

async function calcularIRAPeriodo(matricula, periodo) {
    const result = await db.sequelize.query(`select alunos.nome, alunos.matricula, aluno_turmas.nota, turmas.id_disciplina, disciplinas.carga_horaria, periodos.codigo from alunos
    inner join aluno_turmas
    inner join turmas 
    inner join disciplinas
    inner join periodos
    where turmas.codigo = aluno_turmas.cod_turma 
    and aluno_turmas.matricula_aluno = alunos.matricula 
    and disciplinas.id = turmas.id_disciplina
    and periodos.codigo = turmas.periodo
    and alunos.matricula = :matricula
    and turmas.periodo = :periodo;`, {
        replacements: {matricula: matricula, periodo: periodo},
        type: QueryTypes.SELECT
    });

    console.log(result);

    let somatorioNotas = 0;
    let somatorioPesos = 0;

    for(let i = 0; i < result.length; i++) {
        const atual = result[i];
        somatorioNotas += atual.nota * atual.carga_horaria;
        somatorioPesos += atual.carga_horaria;
    }
    
    const iraPeriodo = somatorioNotas / somatorioPesos;

    return iraPeriodo;
}

exports.calcularIRA = async(matricula) => {
    const result = await db.sequelize.query(`select alunos.nome, alunos.matricula, aluno_turmas.nota, turmas.id_disciplina, disciplinas.carga_horaria from alunos
    inner join aluno_turmas
    inner join turmas 
    inner join disciplinas
    where turmas.codigo = aluno_turmas.cod_turma 
    and aluno_turmas.matricula_aluno = alunos.matricula 
    and disciplinas.id = turmas.id_disciplina and alunos.matricula = :matricula;`, { 
        replacements: { matricula: matricula }, 
        type: QueryTypes.SELECT 
    });

    let somatorioNotas = 0;
    let somatorioPesos = 0;

    for(let i = 0; i < result.length; i++) {
        const atual = result[i];
        somatorioNotas += atual.nota * atual.carga_horaria;
        somatorioPesos += atual.carga_horaria;
    }
    
    const iraGeral = somatorioNotas / somatorioPesos;

    irasPeriodos = [];

    const periodos = await db.sequelize.query(`select codigo from periodos`, { type: QueryTypes.SELECT });

    for(let i = 0; i < periodos.length; i++) {
        periodoAtual = periodos[i].codigo;

        let iraTemp = await calcularIRAPeriodo(matricula, periodoAtual);

        periodoObj = {};
        periodoAtualStr = String(periodoAtual).slice(0, 4) + '.' + String(periodoAtual).slice(4)
        periodoObj[periodoAtualStr] = iraTemp;

        irasPeriodos.push( periodoObj );
    }

    return [iraGeral, irasPeriodos];
}


exports.vinculateTurma = async(body) => {
    let { matricula, cod_disciplina, num_turma, nota, resultado} = body;

    let disciplina = await disciplinaController.findDisciplinaId(cod_disciplina);
    disc = disciplina[0];
    idDisc = disc.id;

    const cod_turma = await turmaController.findTurma(num_turma, cod_disciplina);
    console.log("retornado: " + cod_turma);

    try {
        let aluno_turma = await Aluno_Turma.create({matricula_aluno: matricula, cod_turma: cod_turma, nota: nota, resultado: resultado})
        return "Aluno vinculado à turma"
    }
    catch(error) {
        return error;
    }
};


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