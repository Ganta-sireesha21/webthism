import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden h-full flex flex-col">
      {post.image_url && (
        <div className="h-48 overflow-hidden bg-slate-200">
          <img 
            src={post.image_url} 
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-slate-600 text-sm mb-3 line-clamp-3 flex-grow">
          {post.excerpt || post.content.substring(0, 150)}
        </p>
        <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
          <span className="font-medium">{post.author}</span>
          <span>{formatDate(post.created_at)}</span>
        </div>
        <Link
          to={`/post/${post.id}`}
          className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition duration-200 text-center"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
