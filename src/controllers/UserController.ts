import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import dotEnv from '../../.env';

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

  async read(request: Request, response: Response) {
    const { id } = request.params;
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne({ id });
    Object.assign(user, { _id: undefined, password: undefined });
    return response.json(user);
  }

  async auth(request: Request, response: Response) {
    const { email, password } = request.body;
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne({ email });
    if (!user) {
      return response.json(404).json({ message: 'User does not exist' });
    }

    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response.status(404).json({ message: 'Password does not match' });
    }

    const token = jwt.sign({ _id: user._id, id: user.id }, dotEnv.secrectKey, { expiresIn: '7d' });

    return response.json({ token });
  }
}
const userController = new UserController();
export default userController;
