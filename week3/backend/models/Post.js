const supabase = require('./db');

// Get all posts
const getAllPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Get single post by ID
const getPostById = async (id) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// Create new post
const createPost = async (postData) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([postData])
    .select();

  if (error) throw error;
  return data[0];
};

// Update post
const updatePost = async (id, postData) => {
  const { data, error } = await supabase
    .from('posts')
    .update(postData)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data[0];
};

// Delete post
const deletePost = async (id) => {
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
