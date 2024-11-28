const User = require('../models/User'); // Adjust the path according to your project structure

exports.getProfile = async (req, res) => {
  try {
    // Assuming the user is attached to the request object (from the JWT middleware)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
  }
};
