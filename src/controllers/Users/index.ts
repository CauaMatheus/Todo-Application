import { Request, Response } from 'express';
import createUser from './CreateUser';
import findUserById from './FindUserById';
import authenticateUser from './AuthenticateUser';

class UserController {
  async create(request: Request, response: Response) {
    createUser.execute(request, response);
  }

  async findUser(request: Request, response: Response) {
    findUserById.execute(request, response);
  }

  async authenticate(request: Request, response: Response) {
    authenticateUser.execute(request, response);
  }
}

const userController = new UserController();
export default userController;
