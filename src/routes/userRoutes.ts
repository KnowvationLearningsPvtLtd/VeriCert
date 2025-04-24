import express from 'express'
import verifyToken from '../middlewares/authMiddleware'
import authorizeRoles from '../middlewares/roleMiddleware'

export const userRoutes = express.Router()

/**
 * @swagger
 * /api/users/admin:
 *   get:
 *     summary: Admin access only
 *     description: Returns a welcome message if the user has admin role.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome Admin
 *       401:
 *         description: Unauthorized, invalid token
 *       403:
 *         description: Forbidden, insufficient permissions
 */
userRoutes.get('/admin', verifyToken, authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Welcome Admin' })
})

/**
 * @swagger
 * /api/users/organization:
 *   get:
 *     summary: Admin and Organization access
 *     description: Returns a welcome message if the user has admin or organization role.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome Organization
 *       401:
 *         description: Unauthorized, invalid token
 *       403:
 *         description: Forbidden, insufficient permissions
 */
userRoutes.get('/organization', verifyToken, authorizeRoles('admin', 'organization'), (req, res) => {
    res.json({ message: 'Welcome organization' })
})

/**
 * @swagger
 * /api/users/user:
 *   get:
 *     summary: Access for all roles
 *     description: Returns a welcome message if the user has admin, organization, or user role.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Welcome User
 *       401:
 *         description: Unauthorized, invalid token
 *       403:
 *         description: Forbidden, insufficient permissions
 */
userRoutes.get('/user', verifyToken, authorizeRoles('admin', 'organization', 'user'), (req, res) => {
    res.json({ message: 'Welcome user' })
})
