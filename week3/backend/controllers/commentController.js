const CommentModel = require('../models/Comment');
const PostModel = require('../models/Post');

// Get all comments for a post
exports.getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    // Verify post exists
    const post = await PostModel.getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comments = await CommentModel.getCommentsByPostId(postId);
    res.json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
};

// Create new comment
exports.createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { author, content, email } = req.body;

    if (!postId) {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    // Verify post exists
    const post = await PostModel.getPostById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const commentData = {
      post_id: postId,
      author,
      content,
      email: email || null,
      created_at: new Date(),
    };

    const newComment = await CommentModel.createComment(commentData);
    res.status(201).json({ success: true, data: newComment });
  } catch (error) {
    next(error);
  }
};

// Delete comment
exports.deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    if (!commentId) {
      return res.status(400).json({ error: 'Comment ID is required' });
    }

    await CommentModel.deleteComment(commentId);
    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
