import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { RegisterInput, LoginInput } from '../schemas/validation';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as RegisterInput;
      const result = await AuthService.register(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as LoginInput;
      const result = await AuthService.login(data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}
