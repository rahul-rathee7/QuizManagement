const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

exports.register = async (req, res) => {
  try {
    const { name, rollNumber, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ rollNumber }, { email }] 
    });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ 
      name, 
      rollNumber, 
      email, 
      password: hashed, 
      role: role || 'student' 
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { rollNumber, email, password } = req.body;
    const isAdminRoute = req.path.includes('/admin/');

    // Find user by rollNumber or email
    const user = await User.findOne({
      $or: [
        { rollNumber: rollNumber || email },
        { email: email || rollNumber }
      ]
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if user role matches the route
    if (isAdminRoute && user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ 
      token, 
      user: { 
        name: user.name, 
        role: user.role, 
        rollNumber: user.rollNumber,
        email: user.email 
      } 
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
