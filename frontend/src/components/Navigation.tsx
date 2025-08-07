import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navigation: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                TC
              </div>
              <span>TimedContest</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Problems
              </Link>
              
              <Link
                to="/history"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/history') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Submissions
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <span>Ready to code?</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}