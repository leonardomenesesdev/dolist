import express from 'express';
import UserController from '../controller/userController.js';
import validateToken from '../middleware/validateToken.js';
import expressAsyncHandler from 'express-async-handler';

const routes = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado
 *       400:
 *         description: Dados inválidos
 */
routes.post('/register', expressAsyncHandler(UserController.register))
/**
 * @swagger
 * /api/login:
 *  post:
 *     summary: Faz login de um usuário
 *     tags: [Usuários]
 *     requestBody:
 *          required: true
 *          content: 
 *           application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário logado
 *       400:
 *         description: Dados inválidos
 */
routes.post('/login', expressAsyncHandler(UserController.login))
routes.get("/current", validateToken, UserController.currentUser)
routes.put('/update', validateToken, expressAsyncHandler(UserController.editUser))
routes.delete('/delete', validateToken, UserController.deleteUser)
export default routes;