import { Request, Response } from 'express';
import createUser from './CreateUser';
import findUserById from './FindUserById';
import authenticateUser from './AuthenticateUser';
import updateUser from './UpdateUser';

class UserController {
  async create(request: Request, response: Response) {
    createUser.execute(request, response);
  }

  async findById(request: Request, response: Response) {
    findUserById.execute(request, response);
  }

  async update(request: Request, response: Response) {
    updateUser.execute(request, response);
  }

  async authenticate(request: Request, response: Response) {
    authenticateUser.execute(request, response);
  }
}

const userController = new UserController();
export default userController;
