import { Router, Request, Response } from 'express';
import verifyToken from '../../src/middlewares/authMiddleware';
import Issuer from '../../src/models/issuerModel'; // adjust the path if needed

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
      return res.status(401).json({ message: 'Unauthorized: Invalid token or user data' });
    }

    // Validate input data (additional validation can be added as needed)
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    // Update the issuer profile based on their ID
    const updatedUser = await Issuer.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true, runValidators: true } // Ensure the updated data is returned and validators are run
    ).select('-password'); // Exclude password from the result for security

    // If no user is found with the provided ID, return a 404 error
    if (!updatedUser) {
      return res.status(404).json({ message: 'Issuer not found' });
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

export default router;
