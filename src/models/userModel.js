import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    unique: true,
  },

  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'Please enter a valid password'],
    unique: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// In Next, DB connection doesn't persist permanently.
// If the model already exists, then use it, else create a new one.
// In MongoDB, everything else BECOMES LOWERCASE.

const User = mongoose.models.users || mongoose.model('users', UserSchema);

export default User;
