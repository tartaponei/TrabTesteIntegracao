const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');
const db = require('../modelos/db');

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
        type: QueryTypes.SELECT,
        logging: false
    });

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

module.exports = calcularIRAPeriodo;