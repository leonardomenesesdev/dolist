import request from "supertest";
import app from '../src/app.js'
import mongoose from "mongoose";

beforeAll(async ()=>{
    await mongoose.connect(process.env.DB_CONNECTION_STRING)
})

afterAll(async ()=>{
    await mongoose.connection.close()
})

describe('POST /register', ()=>{
    it('Deve cadastrar um usuário com status 201', async () =>{
        const res = await request(app).post('/register').send({
            username: 'leonardo_tester',
            email: 'leotest@example.com',
            password: '12345678'
        })
    expect(res.statusCode).toBe(201); // ou 200, dependendo da sua resposta
    expect(res.body).toHaveProperty('message'); // ou 'token', 'user', etc.
    })

    it('Deve falhar ao registrar sem email', async () => {
    const res = await request(app).post('/api/users/register').send({
      username: 'sem_email',
      password: '12345678'
    });

    expect(res.statusCode).toBe(400); // ou o status que você definiu para erros
    expect(res.body).toHaveProperty('error');
  });
})