import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../../repositories/UserRepository';

class UpgradeUser {
  async execute(request: Request, response: Response) {
    const { userId } = request;
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne({ _id: userId });
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    if (!user.confirmed) {
      return response.status(400).json({ message: 'User does not confirmed his email' });
    }
    await usersRepository.update({ _id: userId }, { pro: true });
    return response.json({ message: 'User was upgraded' });
  }
}
const upgradeUser = new UpgradeUser();
export default upgradeUser;
