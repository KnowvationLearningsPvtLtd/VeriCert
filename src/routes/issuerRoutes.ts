import { Router } from 'express'
import verifyToken from '../middlewares/authMiddleware'
import { updateProfile, storeCertificates, getCertificateById, sendCertificateWithQR, sendBatchCertificates } from '../controllers/issuerController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Issuer
 *   description: Issuer management and certificate operations
 */

/**
 * @swagger
 * /issuer/profile:
 *   put:
 *     summary: Update issuer profile
 *     description: Update an issuer's profile information
 *     tags: [Issuer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 description: Issuer's username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Issuer's email address
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatedUser:
 *                   type: object
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Issuer not found
 *       500:
 *         description: Server error
 */
router.put('/profile', verifyToken, updateProfile)

/**
 * @swagger
 * /issuer/certificates:
 *   post:
 *     summary: Store certificates
 *     description: Store multiple certificates in JSON format
 *     tags: [Issuer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - certificates
 *               - templateId
 *             properties:
 *               templateId:
 *                 type: string
 *                 description: ID of the template to use
 *               certificates:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *     responses:
 *       201:
 *         description: Certificates stored successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/certificates', verifyToken, storeCertificates)

/**
 * @swagger
 * /issuer/certificates/{id}:
 *   get:
 *     summary: Get certificate by ID
 *     description: Retrieve a certificate by its unique ID
 *     tags: [Issuer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Certificate unique ID
 *     responses:
 *       200:
 *         description: Certificate retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Certificate not found
 *       500:
 *         description: Server error
 */
router.get('/certificates/:id', verifyToken, getCertificateById)

/**
 * @swagger
 * /issuer/certificates/{id}/qr:
 *   get:
 *     summary: Generate QR code and send certificate
 *     description: Generate a QR code for certificate verification and send it to the recipient via email
 *     tags: [Issuer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Certificate unique ID
 *     responses:
 *       200:
 *         description: QR code generated and email sent successfully
 *       400:
 *         description: Certificate missing recipient email
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Certificate not found
 *       500:
 *         description: Server error
 */
router.get('/certificates/:id/qr', verifyToken, sendCertificateWithQR)

/**
 * @swagger
 * /issuer/certificates/send-batch:
 *   post:
 *     summary: Send batch certificates
 *     description: Send multiple certificates with QR codes via email in a batch process
 *     tags: [Issuer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - certificateIds
 *             properties:
 *               certificateIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of certificate IDs to process
 *     responses:
 *       200:
 *         description: Batch processing completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 results:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: array
 *                       items:
 *                         type: string
 *                     failed:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           reason:
 *                             type: string
 *       400:
 *         description: Invalid or empty certificate IDs array
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/certificates/send-batch', verifyToken, sendBatchCertificates)

export default router
