import { Request, Response, NextFunction } from 'express'
import Issuer from '../models/issuerModel'
import Certificate from '../models/certificateModel'
import logger from '../utils/logger'
import QRCode from 'qrcode'
import { sendEmail, EmailAttachment } from '../utils/emailService'

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string
        role: string
    }
}

/**
 * Update issuer profile
 */
export const updateProfile = async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
    try {
        const { username, email } = req.body

        if (!req.user || !req.user.id) {
            res.status(401).json({ message: 'Unauthorized: Invalid token or user data' })
            return
        }

        if (!username || !email) {
            res.status(400).json({ message: 'Username and email are required' })
            return
        }

        const updatedUser = await Issuer.findByIdAndUpdate(req.user.id, { username, email }, { new: true, runValidators: true }).select('-password')

        if (!updatedUser) {
            res.status(404).json({ message: 'Issuer not found' })
            return
        }

        res.json({ updatedUser })
    } catch (err) {
        logger.error('Error updating issuer profile:', err)
        res.status(500).json({ message: 'Failed to update profile. Please try again later.' })
    }
}

/**
 * Store certificates in JSON format
 */
export const storeCertificates = async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
    try {
        const { certificates, templateId } = req.body
        const adminId = req.user?.id

        if (!adminId) {
            res.status(401).json({ message: 'Unauthorized: Invalid token or user data' })
            return
        }

        const savedCertificates = await Promise.all(
            certificates.map(async (cert: any) => {
                const certificateId = Math.floor(100000 + Math.random() * 900000).toString()
                const certificateData = {
                    templateId,
                    data: cert,
                    certificateId,
                    adminId
                }
                const newCertificate = new Certificate(certificateData)
                return await newCertificate.save()
            })
        )

        logger.info(`Issuer ${adminId} stored ${savedCertificates.length} certificates`)
        res.status(201).json({ message: 'Certificates stored successfully', savedCertificates })
    } catch (err) {
        logger.error('Error storing certificates:', err)
        res.status(500).json({ message: 'Failed to store certificates. Please try again later.' })
    }
}

/**
 * Get certificate by ID
 */
export const getCertificateById = async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
    try {
        const { id } = req.params
        const certificate = await Certificate.findOne({ certificateId: id, adminId: req.user?.id })

        if (!certificate) {
            res.status(404).json({ message: 'Certificate not found' })
            return
        }

        res.json({ certificate })
    } catch (err) {
        logger.error('Error fetching certificate:', err)
        res.status(500).json({ message: 'Failed to fetch certificate. Please try again later.' })
    }
}

/**
 * Generate QR code and send certificate via email
 */
export const sendCertificateWithQR = async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
    try {
        const { id } = req.params
        const certificate = await Certificate.findOne({ certificateId: id, adminId: req.user?.id })

        if (!certificate) {
            res.status(404).json({ message: 'Certificate not found' })
            return
        }

        const recipientEmail = certificate.data?.email
        if (!recipientEmail) {
            res.status(400).json({ message: 'Certificate data does not contain recipient email' })
            return
        }

        const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
        const verificationUrl = `${baseUrl}/verify-certificate/${id}`

        const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl)

        const emailSubject = 'Your Certificate from VeriCert'
        const emailText = `
      Dear ${certificate.data?.name || 'Recipient'},
      
      Your certificate has been issued and is available at ${verificationUrl}
      
      You can also scan the attached QR code to view your certificate.
      
      Best regards,
      VeriCert Team
    `

        const attachments: EmailAttachment[] = [
            {
                filename: 'certificate-qrcode.png',
                content: qrCodeDataUrl.split(';base64,').pop() || '',
                encoding: 'base64',
                contentType: 'image/png'
            }
        ]

        await sendEmail(recipientEmail, emailSubject, emailText, attachments)

        logger.info(`Certificate ${id} sent to ${recipientEmail} with QR code`)
        res.json({
            message: 'QR code generated and email sent successfully',
            certificateId: id,
            verificationUrl
        })
    } catch (err) {
        logger.error('Error generating QR code or sending email:', err)
        res.status(500).json({ message: 'Failed to generate QR code or send email. Please try again later.' })
    }
}

/**
 * Send multiple certificates in batch with QR codes via email
 */
export const sendBatchCertificates = async (req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
    try {
        const { certificateIds } = req.body

        if (!Array.isArray(certificateIds) || certificateIds.length === 0) {
            res.status(400).json({ message: 'Invalid or empty certificateIds array' })
            return
        }

        const results = {
            success: [] as string[],
            failed: [] as { id: string; reason: string }[]
        }

        const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

        await Promise.all(
            certificateIds.map(async (id) => {
                try {
                    const certificate = await Certificate.findOne({ certificateId: id, adminId: req.user?.id })

                    if (!certificate) {
                        results.failed.push({ id, reason: 'Certificate not found' })
                        return
                    }

                    const recipientEmail = certificate.data?.email
                    if (!recipientEmail) {
                        results.failed.push({ id, reason: 'Missing recipient email' })
                        return
                    }

                    const verificationUrl = `${baseUrl}/verify-certificate/${id}`

                    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl)

                    const emailSubject = 'Your Certificate from VeriCert'
                    const emailText = `
Dear ${certificate.data?.name || 'Recipient'},

Your certificate has been issued and is available at ${verificationUrl}

You can also scan the attached QR code to view your certificate.

Best regards,
VeriCert Team
        `

                    const attachments: EmailAttachment[] = [
                        {
                            filename: 'certificate-qrcode.png',
                            content: qrCodeDataUrl.split(';base64,').pop() || '',
                            encoding: 'base64',
                            contentType: 'image/png'
                        }
                    ]

                    await sendEmail(recipientEmail, emailSubject, emailText, attachments)

                    results.success.push(id)
                } catch (error) {
                    logger.error(`Error processing certificate ${id}:`, error)
                    results.failed.push({ id, reason: 'Error processing certificate' })
                }
            })
        )

        logger.info(`Batch processing completed: ${results.success.length} successful, ${results.failed.length} failed`)
        res.json({
            message: 'Batch processing completed',
            results
        })
    } catch (err) {
        logger.error('Error in batch certificate processing:', err)
        res.status(500).json({ message: 'Failed to process batch. Please try again later.' })
    }
}
