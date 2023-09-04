const express = require('express');
const User = require('../models/User');
const Thought = require('../models/Thought');

const router = express.Router();

// User routes
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).populate('thoughts friends');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to get users' });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts friends');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unable to get the user' });
  }
});

router.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Unable to create user' });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update user' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete user' });
  }
});

router.post('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { $push: { friends: req.params.friendId } }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unable to add friend' });
  }
});

router.delete('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Unable to remove friend' });
  }
});

// Thought routes
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: 'Unable to get thoughts' });
  }
});

router.get('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: 'Unable to get the thought' });
  }
});

router.post('/thoughts', async (req, res) => {
  try {
    const newThought = new Thought(req.body);
    await newThought.save();

    await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } }, { new: true });
    
    res.json(newThought);
  } catch (error) {
    res.status(500).json({ message: 'Unable to create thought' });
  }
});

router.put('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: 'Unable to update thought' });
  }
});

router.delete('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete thought' });
  }
});

module.exports = router;
