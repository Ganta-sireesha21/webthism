const express = require('express');
const postController = require('../controllers/postController');
const authenticate = require('../middleware/authMiddleware');
const { validatePost } = require('../middleware/validation');

const router = express.Router();

// Get all posts
router.get('/', postController.getAllPosts);

// Get single post
router.get('/:id', postController.getPost);

// Create new post
router.post('/', authenticate, validatePost, postController.createPost);

// Update post
router.put('/:id', authenticate, validatePost, postController.updatePost);

// Delete post
router.delete('/:id', authenticate, postController.deletePost);

module.exports = router;
