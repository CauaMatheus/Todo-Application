import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import UserRepository from '../../repositories/UserRepository';

class DeleteUser {
  async execute(request: Request, response: Response) {
    const { userId } = request;
    const { password } = request.body;

    if (!password) {
      return response.status(404).json({ message: 'Password is required' });
    }

    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findOne({ _id: userId });

    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response.status(404).json({ message: 'Password does not match' });
    }

    usersRepository.delete({ _id: userId });
    return response.send();
  }
}
const deleteUser = new DeleteUser();
export default deleteUser;
