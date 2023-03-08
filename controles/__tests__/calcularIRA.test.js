const calcularIRA = require('../calcularIRA');
const calcularIRATest = require('./calcularIRATest');

var arqMock = require('../MOCK_DATA_COMPLETO.json');
var arqMockErro = require('../MOCK_DATA_ERRO.json');

for(let i = 0; i < arqMock.length; i++) {
    let entrada = arqMock[i].matricula;
    let saida = '';

    calcularIRATest(entrada).then(resul => {
        saida = JSON.stringify(resul);
        // console.log(JSON.stringify(resul))
    })
     .catch(erro => {
         console.log(erro)
    });

    test('Caso de teste (' + entrada + ', ' + saida + ')', () => {
        return calcularIRA.calcularIRA(entrada).then(resultado => {
            return calcularIRATest(entrada).then(res => {
                expect(resultado).toStrictEqual(res)
            })
        })
    });
}

for(let i = 0; i < arqMockErro.length; i++) {
    let entrada = arqMockErro[i].matricula;
    let saida = "ERROR: NÃO ENCONTRADO";

    test('Caso de teste de erro (' + entrada + ', ' + saida + ')', () => {
        return calcularIRA.calcularIRA(entrada).catch(resultado => {
            expect(resultado instanceof Error).toBe(true)
        })
    });
}