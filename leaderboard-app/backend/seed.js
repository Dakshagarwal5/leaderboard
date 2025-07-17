// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI;

const sampleUsers = [
  {
    name: 'Alice',
    points: 120,
    claimHistory: [],
  },
  {
    name: 'Bob',
    points: 95,
    claimHistory: [],
  },
  {
    name: 'Charlie',
    points: 160,
    claimHistory: [],
  },
  {
    name: 'Daksh',
    points: 200,
    claimHistory: [],
  },
  {
    name: 'Eve',
    points: 50,
    claimHistory: [],
  },
];

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await User.deleteMany({});
    const inserted = await User.insertMany(sampleUsers);
    console.log('✅ Sample users inserted:\n', inserted);
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Error seeding users:', err);
    process.exit(1);
  });
