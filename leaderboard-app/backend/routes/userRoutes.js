const express = require('express');
const router = express.Router();
const {
  getUsers,
  claimPoints,
  addUser,
  getHistory
} = require('../controllers/userController');

router.get('/users', getUsers);
router.post('/claim', claimPoints); // ✅ cleanly uses controller
router.post('/add-user', addUser);
router.get('/history', getHistory);

module.exports = router;
