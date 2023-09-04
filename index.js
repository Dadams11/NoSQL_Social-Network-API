const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('MongoDB connected');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
