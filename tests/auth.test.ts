import { AuthService } from '../src/services/authService';
import { RegisterInput, LoginInput } from '../src/schemas/validation';

describe('AuthService', () => {
  it('should register a new user', async () => {
    const userData: RegisterInput = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };

    const result = await AuthService.register(userData);

    expect(result).toHaveProperty('token');
    expect(result.user).toEqual(
      expect.objectContaining({
        email: 'test@example.com',
        name: 'Test User',
      })
    );
  });

  it('should not register user with duplicate email', async () => {
    const userData: RegisterInput = {
      email: 'duplicate@example.com',
      password: 'password123',
      name: 'User',
    };

    await AuthService.register(userData);

    expect(async () => {
      await AuthService.register(userData);
    }).rejects.toThrow();
  });

  it('should login successfully with correct credentials', async () => {
    const userData: RegisterInput = {
      email: 'login@example.com',
      password: 'password123',
      name: 'Login User',
    };

    await AuthService.register(userData);

    const loginData: LoginInput = {
      email: 'login@example.com',
      password: 'password123',
    };

    const result = await AuthService.login(loginData);

    expect(result).toHaveProperty('token');
    expect(result.user.email).toBe('login@example.com');
  });

  it('should not login with incorrect password', async () => {
    const userData: RegisterInput = {
      email: 'test2@example.com',
      password: 'password123',
      name: 'Test User 2',
    };

    await AuthService.register(userData);

    const loginData: LoginInput = {
      email: 'test2@example.com',
      password: 'wrongpassword',
    };

    expect(async () => {
      await AuthService.login(loginData);
    }).rejects.toThrow();
  });
});
