import { Router } from 'express';
import {  registerController } from '../controllers/authController';



const router = Router()


router.post('/register', registerController)
router.post('/login', )
router.post('/refresh-token', )
router.post('/logout', )


export {
    router as authRouter
}