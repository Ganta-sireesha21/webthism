import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../components/CommentSection';

const API_BASE_URL = 'https://webthism-1.onrender.com/api';

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
      setPost(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch post');
      setPost(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${id}/comments`);
      setComments(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await axios.delete(`${API_BASE_URL}/posts/${id}`);
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete post');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="text-slate-600 mt-4">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-slate-700 mb-6">{error}</p>
          <Link
            to="/"
            className="block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded text-center transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Post Not Found</h2>
          <p className="text-slate-700 mb-6">The post you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded text-center transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Featured Image */}
      {post.image_url && (
        <div className="h-96 overflow-hidden bg-slate-200">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Post Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">{post.title}</h1>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b-2 border-slate-200 pb-6">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-slate-900">{post.author}</p>
                <p className="text-sm text-slate-600">{formatDate(post.created_at)}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/edit/${post.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Edit
              </Link>
              <button
                onClick={handleDeletePost}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </header>

        {/* Post Body */}
        <div className="prose prose-lg max-w-none mb-12 text-slate-700">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Comments Section */}
        <CommentSection
          postId={id}
          comments={comments}
          onCommentAdded={fetchComments}
        />
      </article>

      {/* Back Button */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-block bg-slate-300 hover:bg-slate-400 text-slate-900 font-bold py-2 px-6 rounded transition duration-200"
        >
          ← Back to Posts
        </Link>
      </div>
    </div>
  );
}
