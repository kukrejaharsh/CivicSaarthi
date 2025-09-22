// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    // Example roles: 'admin', 'developer', 'qa', etc.
  },
});

module.exports = mongoose.model('User', UserSchema);