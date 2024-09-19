import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModels/admin.model';
import Doctor from '../models/UserModels/doctor.model';
import MedicalStaff from '../models/UserModels/medicalStaff.model'; // Fixed typo
import Patient from '../models/UserModels/patient.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const tokenExpiry = '1h';

// Helper function to generate JWT token
const generateToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: tokenExpiry });
};

// Unified Login Function
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const userModels = [
    { model: User, role: 'Admin' },
    { model: Doctor, role: 'Doctor' },
    { model: MedicalStaff, role: 'Medical Staff' },
    { model: Patient, role: 'Patient' },
  ];

  try {
    for (const { model, role } of userModels) {
      const user = await model.findOne({ email });
      if (user) {
        // Ensure password field is properly accessed
        const isMatch = await bcrypt.compare(password, user.password || user.authentication?.password);
        if (isMatch) {
          const token = generateToken(user._id.toString(), role);
          return res.json({ message: 'Login successful', token });
        } else {
          return res.status(400).json({ error: 'Invalid credentials' });
        }
      }
    }

    // If user not found in any model
    res.status(404).json({ error: 'User not found' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
