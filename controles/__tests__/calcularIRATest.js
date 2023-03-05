var arqMock = require('../MOCK_DATA_COMPLETO.json')

function calcularIRATest(matricula) {
    let somatorioNotas = 0;
    let somatorioPesos = 0;
    let iraPe1 = 0;
    let iraPe2 = 0;

    for(let i = 0; i < arqMock.length; i++) {
        if(arqMock[i].matricula == matricula) { // se for o da matricula que procura
            const atual = arqMock[i];
            somatorioNotas += atual.nota1 * atual.ch1;
            somatorioNotas += atual.nota2 * atual.ch2;
            somatorioPesos += atual.ch1 + atual.ch2;

            iraPe1 = atual.iraPeriodo1;
            iraPe2 = atual.iraPeriodo2;
        }
    }

    const iraPeriodo = somatorioNotas / somatorioPesos;

    return[iraPeriodo, [iraPe1, iraPe2]]
}

module.exports = calcularIRATest;