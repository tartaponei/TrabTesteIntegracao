const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');
const db = require('../modelos/db');
const calcularIRAPeriodo = require('./calcularIRAPeriodo');

exports.calcularIRA = async(matricula) => {
    const result = await db.sequelize.query(`select alunos.matricula, aluno_turmas.nota, disciplinas.carga_horaria from alunos
    inner join aluno_turmas
    inner join turmas 
    inner join disciplinas
    where turmas.codigo = aluno_turmas.cod_turma 
    and aluno_turmas.matricula_aluno = alunos.matricula 
    and disciplinas.id = turmas.id_disciplina and alunos.matricula = :matricula;`, { 
        replacements: { matricula: matricula }, 
        type: QueryTypes.SELECT,
        logging: false,

        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: false,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
    });

    console.log(result);

    if (result.length == 0) {
        throw new Error("NÃO ENCONTRADO");
    }

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

// module.exports = calcularIRAPeriodo;
// module.exports = calcularIRA;