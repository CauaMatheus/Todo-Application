import express from 'express';
import userController from './controllers/Users';

const router = express.Router();

router.post('/signup', userController.create);
router.post('/signin', userController.authenticate);
router.get('/users/:id', userController.findUser);

export default router;
