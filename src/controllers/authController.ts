import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import { generateAccessToken } from '../utils/jwt';
import logger from '../utils/logger';
import { registerSchema } from '../validations/registerSchema';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedData = registerSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({ errors: parsedData.error.format() });
    }

    const { username, password, role } = parsedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });

    await newUser.save();
    logger.info(`User registered: ${username}`);

    res.status(201).json({ message: `User registered with username ${username}` });
  } catch (err) {
    next(err); // Pass error to global error handler
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: `User with username ${username} not found` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateAccessToken({ 
      _id: user._id, 
      role: user.role 
    });
    logger.info(`User logged in: ${username}`);

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export { register, login };




