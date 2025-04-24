import { Request, Response } from 'express'
import Certificate from '../models/certificateModel'
import logger from '../utils/logger'

/**
 * Verify a certificate's authenticity by its ID
 * @param req Request with certificate ID
 * @param res Response object
 */
export const verifyCertificate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        // Find certificate by ID
        const certificate = await Certificate.findOne({ certificateId: id })

        if (!certificate) {
            logger.info(`Certificate verification failed: Certificate ID ${id} not found`)
            res.status(404).json({ message: 'Certificate not found', verified: false })
            return
        }

        logger.info(`Certificate ${id} verified successfully`)
        // Return certificate data and verification status
        res.json({
            message: 'Certificate verified successfully',
            verified: true,
            certificate
        })
    } catch (err) {
        logger.error('Error verifying certificate:', err)
        res.status(500).json({
            message: 'Failed to verify certificate. Please try again later.',
            verified: false
        })
    }
}
