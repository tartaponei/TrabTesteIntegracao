arqMock = require('../MOCK_DATA_COMPLETO.json');
const Aluno = require('../../modelos/aluno_modelo');
const alunoController = require('../../controles/aluno_controle');

//adicionar ao banco
// for (var i = 0; i < arqMock.length; i++) {
//     var atual = arqMock[i];

//     Aluno.create({ nome: atual.nome, matricula: atual.matricula, data_nascimento: atual.data_nascimento, email: null, ano_entrada: atual.ano_entrada })
// }

for (var i = 0; i < arqMock.length; i++) {
    var atual = arqMock[i];

    var temp = {"matricula": atual.matricula, "cod_disciplina": "IC844", "num_turma": 1, "nota": atual.nota1, "resultado": "AP"}

    alunoController.vinculateTurma(temp);

    var temp = {"matricula": atual.matricula, "cod_disciplina": "IC808", "num_turma": 2, "nota": atual.nota2, "resultado": "RF"}

    alunoController.vinculateTurma(temp);

    // Aluno.create({ nome: atual.nome, matricula: atual.matricula, data_nascimento: atual.data_nascimento, email: null, ano_entrada: atual.ano_entrada })
}

