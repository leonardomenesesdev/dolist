import request from "supertest";
import app from '../src/app.js'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), 'tests/.env.test') });


beforeAll(async ()=>{
    await mongoose.connect(process.env.DB_CONNECTION_STRING)
})

afterAll(async ()=>{
    await mongoose.connection.close()
})

let taskId

// já deu certo
// describe('POST /register', () => {
//     it('Deve cadastrar um usuário com status 201', async () => {
//         const res = await request(app)
//         .post('/register').send({
//             username: 'leonard_tester',
//             email: 'leote@example.com',
//             password: '12345678'
//         })
//     expect(res.statusCode).toBe(201); 
//     })

//  FALHA NO CADASTRO
    it('Deve falhar ao registrar sem email', async () => {
    const res = await request(app).post('/register').send({
      username: 'sem_email',
      password: '12345678'
    });

    expect(res.statusCode).toBe(400)
  });

//FALHA NO LOGIN
    it('Deve falhar ao fazer login com credenciais inválidas', async () => {
        const res = await request(app).post('/login').send({
            email: 'j@e.com',
            password: 'senhaerrada'
        })
        expect(res.statusCode).toBe(401)
})

//LOGIN CERTO
    it('Deve fazer login com sucesso', async () => {
        const res = await request(app).post('/login').send({
            email: 'j@e.com',
            password: '123'
        })
        expect(res.statusCode).toBe(200)
    })

//TASKS
    it('Deve retornar as tarefas do usuário autenticado', async () => {
        const loginResponse = await request(app).post('/login').send({
            email: 'j@e.com',
            password: '123'
        })
        const accessToken = loginResponse.body.accessToken
        const res = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${accessToken}`)
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
})

    it('Deve criar uma nova tarefa', async () => {
        const loginResponse = await request(app).post('/login').send({
            email: 'j@e.com',
            password:'123'
        })
        const accessToken = loginResponse.body.accessToken
        const res = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                name: 'Tarefa de teste',
                description: 'Descrição da tarefa',
                priority: 'high',
                status: 'todo'

            })
        expect(res.statusCode).toBe(201)
        taskId = res.body._id
        console.log(taskId)
})
    
    
    it('Deve atualizar uma tarefa existente', async () => {
        const loginResponse = await request(app).post('/login').send({
            email: 'j@e.com',
            password: '123'
        })
        const accessToken = loginResponse.body.accessToken
        const res = await request(app)
            .put(`/tasks/${taskId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                name: 'Tarefa atualizada',
                description: 'Descrição atualizada',
                priority: 'medium',
                status: 'doing'
             })   
            expect(res.statusCode).toBe(200)
    })

    it('Deve deletar uma tarefa existente', async () => {
        const loginResponse = await request(app).post('/login').send({
            email: 'j@e.com',
            password: '123'
        })
        const accessToken = loginResponse.body.accessToken       
        const res = await request(app).delete(`/tasks/${taskId}`).set('Authorization', `Bearer ${accessToken}`)
        expect(res.statusCode).toBe(200)
    })
