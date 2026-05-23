import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Fullstack Blog</Link>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/signup" className="text-gray-700 hover:text-blue-600">Signup</Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        </nav>
      </div>
    </header>
  )
}
