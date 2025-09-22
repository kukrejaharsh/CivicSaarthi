// routes/issues.js
const express = require('express');
const router = express.Router();
const { uploadIssue, getIssues, resolveIssue, getIssueById } = require('../controllers/issueController');
const { verifyToken } = require('../authMiddleware');

// All these routes are protected
router.post('/upload', verifyToken, uploadIssue);
router.get('/', verifyToken, getIssues);
router.patch('/resolve/:id', verifyToken, resolveIssue); 
router.get('/:id', verifyToken, getIssueById)

module.exports = router