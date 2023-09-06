const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const app = express();

// Debugging middleware to print incoming request data
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    console.log(`Incoming ${req.method} request. Body:`, req.body);
  }
  next();
});

// Middleware for JSON parsing
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.catch(err => console.log("MongoDB connection error: ", err));

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
