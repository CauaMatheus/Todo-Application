import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import UserRepository from '../../repositories/UserRepository';

class UpdateUser {
  async execute(request: Request, response: Response) {
    const { userId } = request;
    const {
      newUsername, newPassword, password,
    } = request.body;

    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findOne({ _id: userId });
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response.status(400).json({ message: 'Password does not match' });
    }

    try {
      const newHashedPassword = await bcrypt.hash(newPassword || password, 12);
      await usersRepository.update({ _id: userId },
        {
          username: newUsername || user.username,
          password: newHashedPassword || user.password,
          updated_at: new Date(),
        });

      return response.send();
    } catch {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

const updateUser = new UpdateUser();
export default updateUser;
