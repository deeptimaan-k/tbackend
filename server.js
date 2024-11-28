const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Session middleware (used by Passport for persistent login sessions)
app.use(session({
  secret: process.env.JWT_SECRET, // Secret used to sign the session ID
  resave: false,                  // Don't save session if unmodified
  saveUninitialized: false,       // Don't save uninitialized sessions
  cookie: { secure: false }       // Use 'secure: true' when using HTTPS
}));

// Passport.js configuration
require('./config/passport');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (Google login)
app.use('/api/users', userRoutes); // User profile routes

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`http://localhost:${port}`));
