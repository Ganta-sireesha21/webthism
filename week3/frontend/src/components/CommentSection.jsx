import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function CommentSection({ postId, comments: initialComments, onCommentAdded }) {
  const [comments, setComments] = useState(initialComments || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ author: '', email: '', content: '' });
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/posts/${postId}/comments`,
        formData
      );
      setComments(prev => [...prev, response.data.data]);
      setFormData({ author: '', email: '', content: '' });
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post comment');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`);
        setComments(prev => prev.filter(c => c.id !== commentId));
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete comment');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-12 border-t-2 border-slate-200 pt-8">
      <h3 className="text-3xl font-bold text-slate-900 mb-8">Comments ({comments.length})</h3>

      {/* Comment Form */}
      <div className="bg-slate-50 rounded-lg p-6 mb-8">
        <h4 className="text-xl font-semibold text-slate-900 mb-4">Leave a Comment</h4>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="author"
              placeholder="Your Name"
              value={formData.author}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email (Optional)"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <textarea
            name="content"
            placeholder="Your comment here... (Max 500 characters)"
            value={formData.content}
            onChange={handleInputChange}
            required
            maxLength={500}
            rows="4"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">{formData.content.length}/500</span>
            <button
              type="submit"
              disabled={submitLoading}
              className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-400 text-white font-semibold py-2 px-6 rounded transition duration-200"
            >
              {submitLoading ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-slate-600 text-center py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="bg-white border border-slate-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-bold text-slate-900">{comment.author}</h5>
                  <p className="text-sm text-slate-500">{formatDate(comment.created_at)}</p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
              <p className="text-slate-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
