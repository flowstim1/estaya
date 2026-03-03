// lib/models/User.ts

import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  role: 'user' | 'agent' | 'admin';
  savedProperties: mongoose.Types.ObjectId[];
  resetToken?: string;      // 👈 NEW: For password reset
  resetTokenExpiry?: Date;   // 👈 NEW: When the token expires
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ['user', 'agent', 'admin'],
      default: 'user',
    },
    savedProperties: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      default: []
    }],
    resetToken: {            // 👈 NEW: For storing password reset token
      type: String,
      select: false,
    },
    resetTokenExpiry: {      // 👈 NEW: When the token expires
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>('User', userSchema);

export default User;