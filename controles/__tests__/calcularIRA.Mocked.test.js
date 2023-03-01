'use strict';

const calcularIRA = require('../calcularIRA');

//jest.mock('calcularIRA');
jest.mock('calcularIRAPeriodo');

var arqMock = require('../__mocks__/MOCK_DATA.json')

for(let i = 0; i < arqMock.length; i++) {
    var entrada = arqMock[0].matricula;
    var saida = `10`;

    test('Caso de teste (' + entrada + ', ' + saida + ')', () => {
        expect(calcularIRA.calcularIRA(arqMock[i].matricula)).toBe(10);
    });
}