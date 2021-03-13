import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserRepository from '../../repositories/UserRepository';
import dotEnv from '../../.env';

class AuthenticateUser {
  async execute(request: Request, response: Response) {
    const { email, password } = request.body;
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne({ email });
    if (!user) {
      return response.json(404).json({ message: 'User not found' });
    }

    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response.status(400).json({ message: 'Password does not match' });
    }

    const token = jwt.sign({ _id: user._id, id: user.id }, dotEnv.secrectKey, { expiresIn: '7d' });

    return response.json({ token });
  }
}

const authenticateUser = new AuthenticateUser();
export default authenticateUser;
