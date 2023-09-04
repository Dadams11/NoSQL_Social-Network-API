const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
  reactionBody: String,
  username: String,
  createdAt: Date,
});

const ThoughtSchema = new mongoose.Schema({
  thoughtText: String,
  username: String,
  reactions: [ReactionSchema],
});

module.exports = mongoose.model('Thought', ThoughtSchema);