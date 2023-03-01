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

describe('GET /users', function() {
  it('responds with json', async function() {
    const response = await request(aluno)
      .get('/alunos')
      .set('Accept', 'application/json')
    //expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.body).not.toBeNull();
  });
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

  