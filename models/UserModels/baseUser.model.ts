import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
export interface IBaseUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  generateToken: () => string;
  checkPassword: (password: string) => Promise<boolean>;
}

const baseUserSchema = new Schema<IBaseUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    set: (value: string) => bcrypt.hashSync(value, bcrypt.genSaltSync(12)),
  },
  role: { type: String, required: true },
});

// Method to generate JWT


// Method to check password

const BaseUrl= mongoose.model<IBaseUser>('BaseUser', baseUserSchema);
export default BaseUrl;