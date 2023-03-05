const calcularIRA = require('../calcularIRA');

var arqMock = require('../MOCK_DATA_COMPLETO.json');
const calcularIRATest = require('./calcularIRATest');

for(let i = 0; i < arqMock.length; i++) {
    var entrada = arqMock[0].matricula;
    var saida = calcularIRATest(entrada);

    test('Caso de teste (' + entrada + ', ' + saida + ')', () => {
        expect(calcularIRA.calcularIRA(entrada)).toBe(calcularIRATest(entrada))
    });
}