import express from 'express'
import TaskController from '../controller/taskController.js'
import validateToken from '../middleware/validateToken.js'

const routes = express.Router()

routes.use(validateToken)
routes.get('/tasks', TaskController.getTasks)
routes.get('/tasks/:id', TaskController.getTaskById)
routes.post('/tasks', TaskController.postTask)
routes.put('/tasks/:id', TaskController.updateTask)
routes.delete('/tasks/:id', TaskController.deleteTask)
export default routes