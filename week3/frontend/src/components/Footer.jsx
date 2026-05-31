import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Blog CMS</h3>
            <p className="text-slate-300 text-sm">
              A modern full-stack blog platform built with React, Express, and Supabase.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-cyan-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Create Post</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">About</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Follow</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:text-cyan-400 transition">Twitter</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">GitHub</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 text-center text-slate-400 text-sm">
          <p>&copy; {currentYear} Blog CMS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
