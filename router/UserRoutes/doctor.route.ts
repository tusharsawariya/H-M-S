import { Router } from 'express';
import { body } from 'express-validator';
import { registerDoctor } from '../../controller/doctor.controller';
import { login } from '../../controller/MasterLogin.controller'; // Ensure correct import

const router = Router();

// Validation middleware for signin
const signinValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Register Doctor
router.post('/register', registerDoctor);

// Sign In Doctor
router.post('/signin', signinValidation, login);

export default router;
