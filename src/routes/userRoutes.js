import express from 'express';
import UserController from '../controller/userController.js';
import validateToken from '../middleware/validateToken.js';
import expressAsyncHandler from 'express-async-handler';

const routes = express.Router();
//swagger.ui
//projetos linux - dar um google 
//revisão pelo github -> pegar um pedaço de código e documentar no notion, descrevendo e etc.

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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login efetuado com sucesso
 *       500:
 *         description: Dados inválidos
 */
routes.post('/login', expressAsyncHandler(UserController.login))
/**
 * @swagger
 * /api/current:
 *  get:
 *   summary: Obtém o usuário atual
 *   tags: [Usuários]
 *   security:
 *   - bearerAuth: []
 *   responses:
 *       200:
 *        description: Usuário atual obtido com sucesso
 *       500:
 *        description: Não autorizado
 */
routes.get("/current", validateToken, UserController.currentUser)
/**
 * @swagger
 * /api/update:
 *   put:
 *     summary: Edita os dados do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
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
 *       200:
 *         description: Usuário atualizado com sucesso
 *       500:
 *         description: Não autorizado
 */
routes.put('/update', validateToken, expressAsyncHandler(UserController.editUser))
/**
 * @swagger
 * /api/delete:
 *   delete:
 *     summary: Deleta o usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
routes.delete('/delete', validateToken, UserController.deleteUser)
export default routes