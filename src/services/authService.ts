import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserResponse, AuthResponse } from '../models/types';
import { RegisterInput, LoginInput } from '../schemas/validation';

// Mock database - em produção seria PostgreSQL
const users: Map<string, User> = new Map();

export class AuthService {
  static async register(data: RegisterInput): Promise<AuthResponse> {
    // Verificar se email já existe
    const existingUser = Array.from(users.values()).find(u => u.email === data.email);
    if (existingUser) {
      throw { statusCode: 409, message: 'Email já cadastrado' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Criar usuário
    const userId = Date.now().toString();
    const user: User = {
      id: userId,
      email: data.email,
      password: hashedPassword,
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.set(userId, user);

    // Gerar token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as any
    );

    return {
      token,
      user: this.formatUserResponse(user),
    };
  }

  static async login(data: LoginInput): Promise<AuthResponse> {
    // Encontrar usuário
    const user = Array.from(users.values()).find(u => u.email === data.email);
    if (!user) {
      throw { statusCode: 401, message: 'Credenciais inválidas' };
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw { statusCode: 401, message: 'Credenciais inválidas' };
    }

    // Gerar token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as any
    );

    return {
      token,
      user: this.formatUserResponse(user),
    };
  }

  static formatUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  static async getUserById(userId: string): Promise<User | null> {
    return users.get(userId) || null;
  }
}
