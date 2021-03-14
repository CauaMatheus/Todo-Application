import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import UserRepository from '../../repositories/UserRepository';
import mailProvider from '../../providers/MailTrapMailProvider';
import dotEnv from '../../.env';

class CreateUser {
  async execute(request: Request, response: Response) {
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

      const validateEmailJWT = jwt.sign({ email: user.email }, dotEnv.secrectKey);
      await mailProvider.sendMail({
        to: {
          name: user.username,
          email: user.email,
        },
        from: {
          name: 'Farukkon company',
          email: 'smtp.mailtrap.io',
        },
        subject: 'Confirm your email',
        body: `<p> We received a request from ${user.username} for validate your email ${user.email}</p>
        <p>Click <a href="${dotEnv.serverBaseURL}/validateEmail/${validateEmailJWT}">here</a> to validate your email</p>`,
      });
      Object.assign(user, { _id: undefined, password: undefined });
      return response.status(201).json(user);
    } catch {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}
const createUser = new CreateUser();
export default createUser;
