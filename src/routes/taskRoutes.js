import express from 'express'
import TaskController from '../controller/taskController.js'
import validateToken from '../middleware/validateToken.js'

const routes = express.Router()

routes.use(validateToken)
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtém todas as tarefas do usuário autenticado
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *       401:
 *         description: Não autorizado
 */
routes.get('/tasks', TaskController.getTasks)

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtém uma tarefa pelo ID
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa retornada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       401:
 *         description: Não autorizado
 */
routes.get('/tasks/:id', TaskController.getTaskById)

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
routes.post('/tasks', TaskController.postTask)

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Tarefa não encontrada
 *       401:
 *         description: Não autorizado
 */
routes.put('/tasks/:id', TaskController.updateTask)

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa existente
 *     tags: [Tarefas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       401:
 *         description: Não autorizado
 */
routes.delete('/tasks/:id', TaskController.deleteTask)
export default routes