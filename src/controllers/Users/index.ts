import { Request, Response } from 'express';
import CreateUser from './CreateUser';
import FindUserById from './FindUserById';
import AuthenticateUser from './AuthenticateUser';

const createUser = new CreateUser();
const findUserById = new FindUserById();
const auhtenticateUser = new AuthenticateUser();

class UserController {
  async create(request: Request, response: Response) {
    createUser.execute(request, response);
  }

  async findUser(request: Request, response: Response) {
    findUserById.execute(request, response);
  }

  async authenticate(request: Request, response: Response) {
    auhtenticateUser.execute(request, response);
  }
}

const userController = new UserController();
export default userController;
