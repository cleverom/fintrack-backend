import express, { NextFunction } from 'express';
import { verifyToken } from '../help-auth/helper';

export function restrictTo(...roles: string[]) {
  return async (
    req: express.Request | any,
    res: express.Response,
    next: NextFunction,
  ) => {
    try {
      const auth = req.headers.authorization;
      if (auth === undefined) throw new Error('no authourization');
      const token = auth.split(' ')[1];
      if (!token || token === '') {
        return res.status(401).send('Access denied');
      }
      const decoded: string | any = await verifyToken(token);
      const user = decoded.allUser;
      if (!roles.includes(user.role)) {
        return res.json('you do not have permission to perform this action');
      }
      next();
    } catch (error) {
      if (
        error.message === 'no authourization' ||
        error.message === 'jwt expired'
      ) {
        return res.status(401).json({ message: 'Authorisation failed' });
      }
      return res.status(500).json({ message: 'Internal SERVER error' });
    }
  };
}
