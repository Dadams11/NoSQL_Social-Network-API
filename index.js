const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Debugging middleware
app.use((req, res, next) => {
  console.log('Incoming Request Data:', req.body);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(400).send({ error: 'Invalid JSON format' });
  } else {
    next();
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('MongoDB connected');
});

// Import and use API routes
app.use('/api', apiRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
