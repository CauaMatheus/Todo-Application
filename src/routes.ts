import express from 'express';
import userController from './controllers/UserController';

const router = express.Router();

router.post('/signup', userController.create);
router.post('/signin', userController.auth);
router.get('/users/:id', userController.read);

export default router;
