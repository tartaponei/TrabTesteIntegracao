var arqMock = require('../MOCK_DATA_COMPLETO.json')
var calcularIRAPeriodo = require('../calcularIRAPeriodo');
const db = require('../../modelos/db');
const { QueryTypes } = require('sequelize');
//const sequelize = require('sequelize');

calcularIRATest(12218797323);

async function calcularIRATest(matricula) {
    let somatorioNotas = 0;
    let somatorioPesos = 0;
    let iraPe1 = 0;
    let iraPe2 = 0;

    var irasPeriodos = [];
    
    for(let i = 0; i < arqMock.length; i++) {
        if(arqMock[i].matricula == matricula) { // se for o da matricula que procura
            const atual = arqMock[i];
            
            somatorioNotas += atual.nota1 * 60;
            somatorioNotas += atual.nota2 * 60;
            somatorioPesos += 60 + 60;

            const periodos = await db.sequelize.query(`select codigo from periodos`, { type: QueryTypes.SELECT });

            for(let i = 0; i < periodos.length; i++) {
                periodoAtual = periodos[i].codigo;

                let iraTemp = await calcularIRAPeriodo(matricula, periodoAtual);

                periodoObj = {};
                periodoAtualStr = String(periodoAtual).slice(0, 4) + '.' + String(periodoAtual).slice(4)
                periodoObj[periodoAtualStr] = iraTemp;

                irasPeriodos.push( periodoObj );
            }

            atual.iraPeriodos = irasPeriodos;
        }
    }

    const iraPeriodo = somatorioNotas / somatorioPesos;

    return[iraPeriodo, irasPeriodos]
    //return 10;
}

module.exports = calcularIRATest;