const supabase = require('./db');

// Get all comments for a post
const getCommentsByPostId = async (postId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

// Create new comment
const createComment = async (commentData) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([commentData])
    .select();

  if (error) throw error;
  return data[0];
};

// Delete comment
const deleteComment = async (id) => {
  const { data, error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
};

module.exports = {
  getCommentsByPostId,
  createComment,
  deleteComment,
};
