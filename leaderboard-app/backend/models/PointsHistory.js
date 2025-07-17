// Placeholder for: backend/models/History.js
const mongoose = require('mongoose');

const pointsHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: Number,
  claimedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PointsHistory', pointsHistorySchema);
