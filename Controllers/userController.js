const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    
    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SEC, { expiresIn: '1h' });
    
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Error logging in', error });
  }
};
