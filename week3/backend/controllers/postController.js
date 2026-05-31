const PostModel = require('../models/Post');

// Get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.getAllPosts();
    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

// Get single post
exports.getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    const post = await PostModel.getPostById(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// Create new post
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, author, image_url, excerpt } = req.body;

    const postData = {
      title,
      content,
      author,
      image_url: image_url || null,
      excerpt: excerpt || content.substring(0, 150),
      created_at: new Date(),
      updated_at: new Date(),
    };

    const newPost = await PostModel.createPost(postData);
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(error);
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, author, image_url, excerpt } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    // Check if post exists
    const existingPost = await PostModel.getPostById(id);
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const updateData = {
      title: title || existingPost.title,
      content: content || existingPost.content,
      author: author || existingPost.author,
      image_url: image_url !== undefined ? image_url : existingPost.image_url,
      excerpt: excerpt || (content ? content.substring(0, 150) : existingPost.excerpt),
      updated_at: new Date(),
    };

    const updatedPost = await PostModel.updatePost(id, updateData);
    res.json({ success: true, data: updatedPost });
  } catch (error) {
    next(error);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    // Check if post exists
    const existingPost = await PostModel.getPostById(id);
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    await PostModel.deletePost(id);
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
