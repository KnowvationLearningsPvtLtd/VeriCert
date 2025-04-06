// // tests/unit/authController.test.ts

// 

import { register, login, logout } from '../../../src/controllers/authController';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../../src/models/userModel';
import { generateAccessToken } from '../../../src/utils/jwt';
import { sendEmail } from '../../../src/utils/emailService';
import { registerSchema } from '../../../src/validations/registerSchema';

jest.mock('../../../src/models/userModel'); 
jest.mock('bcryptjs');
jest.mock('../../../src/utils/jwt');
jest.mock('../../../src/utils/emailService');
jest.mock('../../../src/utils/logger');
jest.mock('../../../src/validations/registerSchema');

describe('Auth Controller', () => {
  let req: Partial<Request>, res: Partial<Response>, next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  // --------- REGISTER ---------
  describe('register', () => {
    it('should return 400 if validation fails', async () => {
      (registerSchema.safeParse as jest.Mock).mockReturnValue({ success: false, error: { format: () => 'Invalid' } });

      await register(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ errors: 'Invalid' });
    });

    it('should hash password, save user, send email, and return 201', async () => {
      const mockData = { username: 'test', email: 'test@test.com', password: 'pass', role: 'user' };
      (registerSchema.safeParse as jest.Mock).mockReturnValue({ success: true, data: mockData });
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
      (User.prototype.save as jest.Mock).mockResolvedValue({});
      (sendEmail as jest.Mock).mockResolvedValue(true);

      req.body = mockData;

      await register(req as Request, res as Response, next);

      expect(bcrypt.hash).toHaveBeenCalledWith('pass', 10);
      expect(User.prototype.save).toHaveBeenCalled();
      expect(sendEmail).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should catch errors and call next()', async () => {
      (registerSchema.safeParse as jest.Mock).mockImplementation(() => { throw new Error('fail'); });

      await register(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });

  // --------- LOGIN ---------
  describe('login', () => {
    it('should return 404 if user not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      req.body = { email: 'no@user.com', password: '123' };

      await login(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return 400 on invalid password', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ password: 'hashed' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      req.body = { email: 'test@test.com', password: 'wrong' };

      await login(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 200 with token on valid login', async () => {
      const user = {
        _id: '123',
        username: 'test',
        email: 'test@test.com',
        role: 'user',
        password: 'hashed',
      };

      const mockToken = 'mocked-token';

      (User.findOne as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (generateAccessToken as jest.Mock).mockReturnValue(mockToken);
      (sendEmail as jest.Mock).mockResolvedValue(true);

      req.body = { email: 'test@test.com', password: 'pass' };

      await login(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        token: mockToken,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        }
      });
    });

    it('should catch errors and call next()', async () => {
      (User.findOne as jest.Mock).mockImplementation(() => { throw new Error('fail'); });

      await login(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });

  // --------- LOGOUT ---------
  describe('logout', () => {
    it('should return 200 on logout', () => {
      logout(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User logged out successfully' });
    });
  });
});

