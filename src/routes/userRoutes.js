import express from 'express';
import UserController from '../controller/userController.js';
import validateToken from '../middleware/validateToken.js';
const routes = express.Router();

routes.post('/register', UserController.register);
routes.post('/login', UserController.login);
routes.get("/current", validateToken, UserController.currentUser)
export default routes;