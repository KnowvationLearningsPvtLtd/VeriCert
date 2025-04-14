import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateAccessToken = (user: { _id: string; role: string }) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (user: { _id: string }) => {
  return jwt.sign(
    { id: user._id },
    config.REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET);
};
