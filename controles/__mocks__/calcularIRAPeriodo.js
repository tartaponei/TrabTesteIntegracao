const calcularIRAPeriodo = jest.createMockFromModule('aluno_controle');

function calcularIRAPeriodo(matricula, periodo){
    //return parseInt(Math.random() * 10);
    return 10;
}

calcularIRAPeriodo.calcularIRAPeriodo = calcularIRAPeriodo;

module.exports = calcularIRAPeriodo;