const request = require('supertest');
const express = require('express');

const aluno = require('../rotas/aluno')

// app.get('/user', function(req, res) {
//   res.status(200).json({ name: 'john' });
// });

// request(aluno)
//   .get('/alunos')
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });

describe('GET /alunos', function() {
  it('Tem propriedades', async () => {
    const response = await request(aluno)
      .get('/alunos')
      .set('Accept', 'application/json')
      .expect(200);
      
      expect(response.body.Nome).not.toBeNull();
      //expect(response.headers["Content-Type"]).toMatch(/json/);
      //.end(function (err, response) {
      // response.body.should.have.property("CR");
      //expect(body).not.toBeNull();
      })
  });

// it("GET /alunos", async () => {
//   //test("GET /", (done) => {
//     var response = await request(aluno)
//       .get("/alunos")
//       //.expect("Content-Type", /json/)
//       //.expect(200)
//       .expect(response.body).responseType.toBeNull();

//       //expect(response.body).not.toBeNull();
//   });

  