import { Request, Response } from 'express';
import Admin from '../models/UserModels/admin.model'; // Ensure this model extends the base user schema
import BaseUrl from '../models/UserModels/baseUser.model';
// Register Admin
export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create a new admin user
    const admin = new Admin({
      username,
      email,
      password,
      role: 'admin' // Set role explicitly
    });

    // Save the user to the database
    await admin.save();

    // Generate a token for the newly registered admin
    const token = admin.generateToken();
    res.status(201).json({ message: 'Admin registered successfully', token });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
