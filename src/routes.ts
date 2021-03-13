import express from 'express';
import todoController from './controllers/Todos';
import userController from './controllers/Users';
import verifyIfIsAnValidToken from './middlewares/VerifyIfIsAnValidToken';

const router = express.Router();

router.post('/signup', userController.create);
router.post('/signin', userController.authenticate);
router.get('/users/:id', userController.findUser);

router.use(verifyIfIsAnValidToken.execute);

router.post('/todos', todoController.create);

export default router;
