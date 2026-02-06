const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());
// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// DB connection
app.get('/', (req, res) => {
  res.send('API is running...');
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});