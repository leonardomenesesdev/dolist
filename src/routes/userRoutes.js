import express from 'express';
import UserController from '../controller/userController.js';
import validateToken from '../middleware/validateToken.js';
import expressAsyncHandler from 'express-async-handler';

const routes = express.Router();

routes.post('/register', expressAsyncHandler(UserController.register));
routes.post('/login', expressAsyncHandler(UserController.login));
routes.get("/current", validateToken, UserController.currentUser)
export default routes;