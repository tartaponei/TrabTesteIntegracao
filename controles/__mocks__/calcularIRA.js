' use strict'
const calcularIRA = jest.createMockFromModule('calcularIRA');

// function calcularIRA(matricula){
//     return [8, [{'20211': 9}, {'20212': 7.5}, {'20221': 6.7}]];
// }

function calcularIRA(matricula){
    return [8, [{'20211': 9}, {'20212': 7.5}, {'20221': 6.7}]];
}

//calcularIRA.calcula = calcularIRA;

exports.calcularIRA = calcularIRA;