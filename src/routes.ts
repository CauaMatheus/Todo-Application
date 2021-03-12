import express from 'express';
import userController from './controllers/UserController';

const router = express.Router();

router.post('/register', userController.create);

export default router;
