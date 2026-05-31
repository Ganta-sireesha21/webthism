const express = require('express');
const commentController = require('../controllers/commentController');
const { validateComment } = require('../middleware/validation');

const router = express.Router({ mergeParams: true });

// Get all comments for a post
router.get('/', commentController.getComments);

// Create new comment
router.post('/', validateComment, commentController.createComment);

// Delete comment
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
