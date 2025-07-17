// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   points: { type: Number, default: 0 },
//   claimHistory: [
//     {
//       pointsClaimed: Number,
//       timestamp: { type: Date, default: Date.now },
//     },
//   ],
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  points: { type: Number, default: 0 },
  pointHistory: [
    {
      points: Number,
      claimedAt: Date
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
