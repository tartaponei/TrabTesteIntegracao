const request = require('supertest');
const express = require('express');
var should = require('should');

const aluno = require('../rotas/aluno');
const app = require('../index');
const arq = require('../controles/MOCK_DATA_COMPLETO.json')

for(let i = 0; i < arq.length; i++) {
  describe('GET /alunos', function() {
    it('Tem propriedades não nulas', async () => {
      const response = await request(app)
        .get('/alunos')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
        
        expect(response.body.nome).not.toBeNull();
        expect(response.body.data_nascimento).not.toBeNull();

        // expect(response.body[i].nome).toBe(arq[i].nome);
        // expect(response.body[i].matricula).toBe(arq[i].matricula);

        //expect(response.headers["Content-Type"]).toMatch(/json/);
        //.end(function (err, response) {
        // response.body.should.have.property("CR");
        //expect(body).not.toBeNull();
      })
  });
}

for(let i = 0; i < arq.length; i++) {
  describe('GET /alunos', function() {
    it('Tem propriedades cadastradas', async () => {
      const response = await request(app)
        .get('/alunos')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
        
        expect(response.body.nome).not.toBeNull();
        expect(response.body.data_nascimento).not.toBeNull();

        response.body.should.containDeepOrdered({"nome": arq[i].nome, "matricula": arq[i].matricula, "data_nascimento": arq[i].data_nascimento});

        // expect(response.body[i].nome).toBe(arq[i].nome);
        // expect(response.body[i].matricula).toBe(arq[i].matricula);

        //expect(response.headers["Content-Type"]).toMatch(/json/);
        //.end(function (err, response) {
        // response.body.should.have.property("CR");
        //expect(body).not.toBeNull();
        })
    });
}



// it("GET /alunos", async () => {
//   //test("GET /", (done) => {
//     var response = await request(aluno)
//       .get("/alunos")
//       //.expect("Content-Type", /json/)
//       //.expect(200)
//       .expect(response.body).responseType.toBeNull();

//       //expect(response.body).not.toBeNull();
//   });

  