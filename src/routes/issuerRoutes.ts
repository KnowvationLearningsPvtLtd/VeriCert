import { Router, Request, Response } from 'express';
import verifyToken from '../../src/middlewares/authMiddleware';
import Issuer from '../../src/models/issuerModel'; // adjust the path if needed
import Certificate from '../../src/models/certificateModel';

const router = Router();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

router.put('/profile', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Destructure the necessary fields from the request body
    const { username, email } = req.body;

    // Check if the user is authenticated and has a valid ID
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: 'Unauthorized: Invalid token or user data' });
      return;
    }

    // Validate input data (additional validation can be added as needed)
    if (!username || !email) {
      res.status(400).json({ message: 'Username and email are required' });
      return;
    }

    // Update the issuer profile based on their ID
    const updatedUser = await Issuer.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true, runValidators: true } // Ensure the updated data is returned and validators are run
    ).select('-password'); // Exclude password from the result for security

    // If no user is found with the provided ID, return a 404 error
    if (!updatedUser) {
      res.status(404).json({ message: 'Issuer not found' });
      return;
    }

    // Return the updated user details
    res.json({ updatedUser });
  } catch (err) {
    // Log the error for debugging purposes
    console.error('Error updating issuer profile:', err);
    
    // Send a generic error response
    res.status(500).json({ message: 'Failed to update profile. Please try again later.' });
  }
});

// Route to store certificates in JSON format
router.post('/certificates', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { certificates, templateId } = req.body; // Expecting an array of certificates and a template ID
    const adminId = req.user?.id;

    if (!adminId) {
      res.status(401).json({ message: 'Unauthorized: Invalid token or user data' });
      return;
    }

    // Assign a unique 6-digit ID to each certificate and store as JSON
    const savedCertificates = await Promise.all(certificates.map(async (cert: any) => {
      const certificateId = Math.floor(100000 + Math.random() * 900000).toString();
      const certificateData = {
        templateId,
        data: cert,
        certificateId,
        adminId
      };
      const newCertificate = new Certificate(certificateData);
      return await newCertificate.save();
    }));

    res.status(201).json({ message: 'Certificates stored successfully', savedCertificates });
  } catch (err) {
    console.error('Error storing certificates:', err);
    res.status(500).json({ message: 'Failed to store certificates. Please try again later.' });
  }
});

// Route to fetch a certificate by its unique ID
router.get('/certificates/:id', verifyToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const certificate = await Certificate.findOne({ certificateId: id, adminId: req.user?.id });

    if (!certificate) {
      res.status(404).json({ message: 'Certificate not found' });
      return;
    }

    res.json({ certificate });
  } catch (err) {
    console.error('Error fetching certificate:', err);
    res.status(500).json({ message: 'Failed to fetch certificate. Please try again later.' });
  }
});

export default router;
