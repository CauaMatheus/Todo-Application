import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../../repositories/UserRepository';

export default class FindUserById {
  async execute(request: Request, response: Response) {
    const { id } = request.params;
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne({ id });
    Object.assign(user, { _id: undefined, password: undefined });
    return response.json(user);
  }
}
