const express = require('express');
const User = require('../models/User');
const Thought = require('../models/Thought');

const router = express.Router();

// User Routes
// GET all users
router.get('/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// POST new user
router.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

// PUT update user
router.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// DELETE user
router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// POST add friend
router.post('/users/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, { $push: { friends: req.params.friendId } }, { new: true });
  res.json(user);
});

// DELETE remove friend
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
  res.json(user);
});

// Thought Routes
// GET all thoughts
router.get('/thoughts', async (req, res) => {
  const thoughts = await Thought.find({});
  res.json(thoughts);
});

// POST new thought
router.post('/thoughts', async (req, res) => {
  const newThought = new Thought(req.body);
  await newThought.save();
  res.json(newThought);
});

// PUT update thought
router.put('/thoughts/:id', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(thought);
});

// DELETE thought
router.delete('/thoughts/:id', async (req, res) => {
  await Thought.findByIdAndDelete(req.params.id);
  res.json({ message: 'Thought deleted' });
});

// POST add reaction
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
  res.json(thought);
});

// DELETE remove reaction
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true });
  res.json(thought);
});

module.exports = router;
