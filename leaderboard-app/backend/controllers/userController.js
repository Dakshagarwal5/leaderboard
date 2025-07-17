const User = require('../models/User');

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

// Claim random points
const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    const randomPoints = Math.floor(Math.random() * 100) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.points += randomPoints;
    user.pointHistory.push({
      points: randomPoints,
      claimedAt: new Date(),
    });

    await user.save();

    res.status(200).json({
      message: 'Points claimed successfully',
      claimedPoints: randomPoints, // ✅ this goes to frontend
    });
  } catch (err) {
    console.error('Claim error:', err);
    res.status(500).json({ message: 'Server error during claim' });
  }
};

// Add new user
const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name, points: 0, pointHistory: [] });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error adding user' });
  }
};

// Get point history
const getHistory = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.pointHistory);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history' });
  }
};

module.exports = {
  getUsers,
  claimPoints,
  addUser,
  getHistory
};
