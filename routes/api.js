const express = require('express');
const User = require('../models/User');
const Thought = require('../models/Thought');

const router = express.Router();

// User Routes

// POST: Create a new User
router.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      console.log("Error:", err);
      res.status(500).json(err);
    }
  }
});

// GET: Retrieve all Users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE: Remove a User by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Thought Routes

// POST: Create a new Thought
router.post('/thoughts', async (req, res) => {
  try {
    const newThought = new Thought(req.body);
    await newThought.save();
    res.status(201).json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET: Retrieve all Thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET: Retrieve a single Thought by ID
router.get('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT: Update a Thought by ID
router.put('/thoughts/:id', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) return res.status(404).json({ message: 'Thought not found' });
    res.status(200).json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE: Remove a Thought by ID
router.delete('/thoughts/:id', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deletedThought) return res.status(404).json({ message: 'Thought not found' });
    res.status(200).json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
