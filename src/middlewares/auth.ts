import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '../models/types';

// Estender Express Request com user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token não fornecido' });
      return;
    }

    const decoded = jwt.verify(token, (process.env.JWT_SECRET || 'secret') as string) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error: any) {
      res.status(400).json({ 
        message: 'Erro de validação',
        errors: error.errors 
      });
    }
  };
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Erro interno do servidor'
  });
};
