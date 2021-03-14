import { Request, Response } from 'express';
import createUser from './CreateUser';
import findUserById from './FindUserById';
import authenticateUser from './AuthenticateUser';
import updateUser from './UpdateUser';
import deleteUser from './DeleteUser';
import validateEmail from './ValidateEmail';

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

  async delete(request: Request, response: Response) {
    deleteUser.execute(request, response);
  }

  async authenticate(request: Request, response: Response) {
    authenticateUser.execute(request, response);
  }

  async validate(request: Request, response: Response) {
    validateEmail.execute(request, response);
  }
}

const userController = new UserController();
export default userController;
