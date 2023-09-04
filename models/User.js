const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
module.exports = mongoose.model('User', UserSchema);