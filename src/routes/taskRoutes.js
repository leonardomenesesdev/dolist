import express from 'express'
import TaskController from '../controller/taskController.js'

const routes = express.Router()

routes.get('/tasks', TaskController.getTasks)
routes.post('/tasks', TaskController.postTask)
routes.put('/tasks/:id', TaskController.updateTask)
routes.delete('/tasks/:id', TaskController.deleteTask)
export default routes