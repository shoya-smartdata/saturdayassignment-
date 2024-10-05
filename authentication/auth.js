const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = await User.findByPk(decoded.userId);
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    return res.status(403).json({ message: 'Forbidden' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
