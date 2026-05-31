import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';

const API_BASE_URL = 'https://webthism-1.onrender.com/api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/posts`);
      setPosts(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Blog CMS</h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8">
            Discover amazing stories, insights, and articles from writers around the world
          </p>
          <Link
            to="/create"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition duration-200 text-lg"
          >
            Start Writing
          </Link>
        </div>
      </section>

      {/* Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">Latest Posts</h2>
          <p className="text-lg text-slate-600">Explore our latest articles and stories</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
              <p className="text-slate-600 mt-4">Loading posts...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-semibold">Error Loading Posts</p>
            <p>{error}</p>
            <button
              onClick={fetchPosts}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">No posts yet</h3>
            <p className="text-slate-600 mb-6">Be the first to write a post!</p>
            <Link
              to="/create"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded transition duration-200"
            >
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
