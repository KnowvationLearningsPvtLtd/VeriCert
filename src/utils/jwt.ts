// import jwt from 'jsonwebtoken';
// import config from '../config/config';

// export const generateAccessToken = (user: { _id: string; role: string }) => {
//   return jwt.sign(
//     { id: user._id, role: user.role },
//     config.JWT_SECRET,
//     { expiresIn: '15m' }
//   );
// };

// export const generateRefreshToken = (user: { _id: string }) => {
//   return jwt.sign(
//     { id: user._id },
//     config.RESFRESH_SECRET,
//     { expiresIn: '7d' }
//   );
// };

// export const verifyToken = (token: string) => {
//   return jwt.verify(token, config.JWT_SECRET);
// };

import jwt from 'jsonwebtoken';
import config from '../config/config';

// Optional: Fail fast if secrets are missing
if (!config.JWT_SECRET || !config.REFRESH_SECRET) {
  throw new Error('JWT secrets not set in environment variables');
}

export const generateAccessToken = (user: { _id: string; role: string }) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.JWT_SECRET as string,
    { expiresIn: '15m' }
  );
};

export const generateRefreshToken = (user: { _id: string }) => {
  return jwt.sign(
    { id: user._id },
    config.REFRESH_SECRET as string,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET as string);
};
