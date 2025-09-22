// controllers/issueController.js
const Issue = require('../models/issue');

// @desc    Upload a new issue
// @route   POST /api/issues/upload
exports.uploadIssue = async (req, res) => {
  const { imageUrl, issueName, issueClassification, description } = req.body;

  // Automatically determine the department to assign the issue to
  const assignedTo = getDepartmentForIssue(issueClassification);

  try {
    const newIssue = new Issue({
      imageUrl,
      issueName,
      issueClassification,
      assignedTo, // <-- Use the automatically determined department
      description,
      openedBy: req.user.id,
      status: 'open',
    });

    const issue = await newIssue.save();
    res.status(201).json(issue);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get all issues assigned to the user's role
// @route   GET /api/issues
exports.getIssues = async (req, res) => {
  try {
    // Get user's role from the token payload
    const userRole = req.user.role;

    const issues = await Issue.find({ assignedTo: userRole });
    res.json(issues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Resolve an issue by setting its status to 'closed'
// @route   PATCH /api/issues/resolve/:id
exports.resolveIssue = async (req, res) => {
  try {
    let issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ msg: 'Issue not found' });
    }
    
    // Optional: Check if the user is authorized to resolve this issue
    // For example, if only the assigned role can close it.
    if (issue.assignedTo !== req.user.role) {
        return res.status(403).json({ msg: 'User not authorized to resolve this issue' });
    }

    issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'closed' } },
      { new: true } // Return the updated document
    );

    res.json(issue);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get a single issue by ID
// @route   GET /api/issues/:id
exports.getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ msg: 'Issue not found' });
    }
    
    // Authorization check: ensure the user is assigned to this issue
    if (issue.assignedTo !== req.user.role) {
      return res.status(403).json({ msg: 'User not authorized to view this issue' });
    }

    res.json(issue);
  } catch (err) {
    console.error(err.message);
    // Handle cases where the ID format is invalid
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Issue not found' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};