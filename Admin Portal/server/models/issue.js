// models/Issue.js
const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  issueName: {
    type: String,
    required: true,
  },
  issueClassification: {
    type: String,
    required: true,
  },
  assignedTo: { // This will match a user's role
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'open', // Default status when created
  },
  description: {
    type: String,
    required: true,
  },
  openedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // As requested, can be null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Issue', IssueSchema);