const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  googleId: { type: String }, 
  name: { type: String, required: true },
  username: { type: String, unique: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  profilePicture: { type: String, default: 'default-profile.png' },
  phone: { type: String },
  address: { type: String },
  role: { 
    type: String, 
    enum: ['User', 'Admin'], 
    default: 'User' 
  },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
