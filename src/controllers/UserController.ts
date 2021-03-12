import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';

class UserController {
  async create(request: Request, response: Response) {
    const { username, email, password } = request.body;
    const usersRepository = getCustomRepository(UserRepository);
    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      return response.status(400).json({ message: 'User already exists' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = usersRepository.create({ username, email, password: hashedPassword });
      await usersRepository.save(user);

      return response.status(201).json(user);
    } catch {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}
const userController = new UserController();
export default userController;
