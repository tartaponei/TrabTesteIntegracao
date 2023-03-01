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