import express from 'express';
import userController from './controllers/Users';
import verifyIfIsAnValidToken from './middlewares/VerifyIfIsAnValidToken';

const router = express.Router();

router.post('/signup', userController.create);
router.post('/signin', userController.authenticate);
router.get('/users/:id', userController.findUser);

router.use(verifyIfIsAnValidToken.execute);

export default router;
