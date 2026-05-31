const express = require('express');
const authRoutes = require('./auth');
const postRoutes = require('./posts');
const commentRoutes = require('./comments');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/posts/:postId/comments', commentRoutes);

module.exports = router;
