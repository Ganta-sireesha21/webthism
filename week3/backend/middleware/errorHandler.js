// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Supabase errors
  if (err.message && err.message.includes('not found')) {
    return res.status(404).json({ error: 'Resource not found' });
  }

  if (err.status === 400) {
    return res.status(400).json({ error: err.message || 'Bad request' });
  }

  if (err.status === 401) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  // Default error
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};

module.exports = errorHandler;
