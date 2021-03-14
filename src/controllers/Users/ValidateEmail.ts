import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import dotEnv from '../../.env';
import UserRepository from '../../repositories/UserRepository';

interface TokenPayload {
  email: string,
  iat: number
}

class ValidateEmail {
  async execute(request: Request, response: Response) {
    const { token } = request.params;
    const { email } = jwt.verify(token, dotEnv.secrectKey) as TokenPayload;

    const usersRepository = getCustomRepository(UserRepository);
    await usersRepository.update({ email }, { confirmed: true, updated_at: new Date() });

    return response.send();
  }
}

const validateEmail = new ValidateEmail();
export default validateEmail;
