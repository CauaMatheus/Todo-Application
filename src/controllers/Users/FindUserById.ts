import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../../repositories/UserRepository';

class FindUserById {
  async execute(request: Request, response: Response) {
    const { id } = request.params;
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne({ id });
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    Object.assign(user, { _id: undefined, password: undefined });
    return response.json(user);
  }
}
const findUserById = new FindUserById();
export default findUserById;
