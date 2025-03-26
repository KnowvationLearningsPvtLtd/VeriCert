import express from 'express';
import verifyToken from '../middlewares/authMiddleware';
import authorizeRoles from '../middlewares/roleMiddleware';

export const userRoutes = express.Router();

// only admin can acess this router
userRoutes.get('/admin', 
    verifyToken, 
    authorizeRoles('admin'),
(req,res) => {
    res.json({message: 'Welcome Admin'});
});

// Both admin and organization can access
userRoutes.get('/organization',
     verifyToken, 
     authorizeRoles('admin', 'organization'),
(req,res) => {
    res.json({message: 'Welcome organization'});
});

// All can access
userRoutes.get('/user',
     verifyToken,
     authorizeRoles('admin', 'organization', 'user'),
     (req,res) => {
    res.json({message: 'Welcome user'});
});
