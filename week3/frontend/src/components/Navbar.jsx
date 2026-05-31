import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    setIsAuthenticated(Boolean(token));
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition">
              Blog CMS
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-cyan-400 transition duration-200">
              Home
            </Link>
            <Link to="/create" className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded transition duration-200">
              Write Post
            </Link>
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="px-4 py-2 rounded border border-cyan-500 hover:bg-cyan-500 hover:text-white transition duration-200">
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-slate-900 px-4 py-2 rounded hover:bg-slate-100 transition duration-200">
                  Signup
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-slate-100 px-3 py-2 rounded-full bg-slate-800 border border-slate-700">
                  {user?.name ? `Hi, ${user.name}` : 'Profile'}
                </span>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-200">
                  Logout
                </button>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button className="text-cyan-400 hover:text-cyan-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
