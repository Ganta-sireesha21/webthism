// Validate post data
const validatePost = (req, res, next) => {
  const { title, content, author } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Content is required' });
  }

  if (!author || author.trim() === '') {
    return res.status(400).json({ error: 'Author is required' });
  }

  if (title.length < 3) {
    return res.status(400).json({ error: 'Title must be at least 3 characters long' });
  }

  if (content.length < 10) {
    return res.status(400).json({ error: 'Content must be at least 10 characters long' });
  }

  next();
};

// Validate comment data
const validateComment = (req, res, next) => {
  const { author, content } = req.body;

  if (!author || author.trim() === '') {
    return res.status(400).json({ error: 'Author name is required' });
  }

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Comment text is required' });
  }

  if (content.length < 1) {
    return res.status(400).json({ error: 'Comment cannot be empty' });
  }

  if (content.length > 500) {
    return res.status(400).json({ error: 'Comment must be less than 500 characters' });
  }

  next();
};

module.exports = {
  validatePost,
  validateComment,
};
