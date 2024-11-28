const passport = require('passport');
const jwtHelper = require('../utils/tokenHelper');

exports.googleAuth = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

exports.googleAuthCallback = (req, res) => {
  passport.authenticate('google', { failureRedirect: '/login' }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Authentication failed' });
    }

    // Generate JWT token
    const token = jwtHelper.generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Google authentication successful!',
      token,
      user,
    });
  })(req, res);
};
