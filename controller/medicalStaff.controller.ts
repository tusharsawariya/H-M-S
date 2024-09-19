import { Request, Response } from 'express';
import MedicalStaff from '../models/UserModels/medicalStaff.model';
import BaseUser from '../models/UserModels/baseUser.model'; // Import the BaseUser model

// Register Medical Staff
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, department } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await BaseUser.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create a new user instance
    const user = new BaseUser({
      username,
      email,
      password, // Password will be hashed by the schema's setter
      role: 'Medical Staff', // Set the role directly
    });

    // Save the new user to the database
    await user.save();

    // Create a MedicalStaff record associated with the BaseUser
    const medicalStaff = new MedicalStaff({
      userId: user._id, // Assuming a userId field exists in the MedicalStaff model
      department,
      // Add other MedicalStaff specific fields if necessary
    });

    await medicalStaff.save();

    // Generate JWT token
    const token = user.generateToken();

    // Respond with success message and token
    res.status(201).json({ message: 'Medical staff registered successfully', token });
  } catch (error) {
    console.error('Error registering medical staff:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
