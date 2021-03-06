import express from 'express';
import todoController from './controllers/Todos';
import userController from './controllers/Users';
import verifyIfIsAnValidToken from './middlewares/VerifyIfIsAnValidToken';

const router = express.Router();

router.post('/signup', userController.create);
router.post('/signin', userController.authenticate);
router.get('/users/profile/:id', userController.findById);
router.get('/users/todos/:id', todoController.list);
router.get('/validateEmail/:token', userController.validate);

router.use(verifyIfIsAnValidToken.execute);

router.put('/profile', userController.update);
router.patch('/profile/upgrade', userController.upgrade);
router.delete('/profile', userController.delete);

router.post('/todos', todoController.create);
router.put('/todos/:todoId', todoController.update);
router.delete('/todos/:todoId', todoController.delete);

export default router;
