import { Router } from 'express';
import { register, login } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/register', register as any);
authRouter.post('/login', login as any);

export { authRouter };
