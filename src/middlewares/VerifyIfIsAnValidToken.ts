import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotEnv from '../.env';

interface TokenPayload {
  _id: string
  id: string,
  iat: number,
  exp: number
}

class VerifyIfIsAnValidToken {
  async execute(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;
    if (!authorization) {
      return response.status(404).json({ message: 'You need to insert an authorization token' });
    }

    try {
      const { _id, id } = jwt.verify(authorization, dotEnv.secrectKey) as TokenPayload;
      request.id = id;
      request.userId = _id;
      return next();
    } catch {
      return response.status(404).json({ message: 'Invalid token' });
    }
  }
}
const verifyIfIsAnValidToken = new VerifyIfIsAnValidToken();
export default verifyIfIsAnValidToken;
