const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const username = process.env.DB_USER;
const password = encodeURIComponent(process.env.DB_PASS); // important to encode special characters like @
const cluster = process.env.CLUSTER_URI;

const mongoURI = `mongodb+srv://${username}:${password}@${cluster}/leaderboard?retryWrites=true&w=majority`;

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
