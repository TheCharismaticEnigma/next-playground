import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: 'string',
    required: [true, 'Please enter a username'],
    unique: true,
  },

  email: {
    type: 'string',
    required: [true, 'Please enter an email'],
    unique: true,
  },

  password: {
    type: 'string',
    required: [true, 'Please enter a valid password'],
    unique: true,
  },

  isVerified: {
    type: 'boolean',
    default: false,
  },

  forgotPasswordToken: 'string',
  forgotPasswordTokenExpiry: 'string',
  verifyToken: 'string',
  verifyTokenExpiry: 'string',
});

// In Next, DB connection doesn't persist permanently.
// If the model already exists, then use it, else create a new one.
// In MongoDB, everything else BECOMES LOWERCASE.

const User = mongoose.models.users || mongoose.model('users', UserSchema);

export default User;
