import express from 'express';
import { body } from 'express-validator';
import { registerAdmin } from '../../controller/admin.controller'; // Adjust path if necessary
import { login } from '../../controller/MasterLogin.controller'; // Ensure correct import

const router = express.Router();

// Validation middleware for signup
const signupValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Validation middleware for signin
const signinValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Register route
router.post('/register', signupValidation, registerAdmin);

// Login route
router.post('/login', signinValidation, login);

export default router;
