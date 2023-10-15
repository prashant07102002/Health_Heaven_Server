import express from 'express';
import authController from '../Controllers/authController.js';
const Router = express.Router();
Router.post('/signup', authController.signupController);
Router.post('/login', authController.loginController);
Router.get('/logout',authController.logoutController);
Router.get('/refreshToken', authController.generateRefreshTokenController);
export default Router;