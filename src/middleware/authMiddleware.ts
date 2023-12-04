import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const isAuthenticatedAndAuthorized = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: 'Notoken provided' });

  const parts = authHeader.split(' ');

  if (!(parts.length === 2)) return res.status(401).send({ error: 'Token error' });

  const [scheme, token] = parts;

  if (!/^Bearer$/.test(scheme)) return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.status(401).send({ error: 'Token invalid' });
    return next();
  });

  if (req.session.role === 'admin') {
    console.log('role: ', req.session.role);
    console.log('Sessão ok');
    return next();
  } else {
    console.log('role: ', req.session.role);
    return res.status(403);
  }

  next();
};
export { isAuthenticatedAndAuthorized };
