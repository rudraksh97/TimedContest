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
    <nav className="bg-hackerrank-darker border-b border-hackerrank-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-lg font-bold text-hackerrank-text hover:text-hackerrank-green transition-colors"
            >
              <div className="w-10 h-10 hackerrank-gradient rounded-lg flex items-center justify-center text-hackerrank-dark text-lg font-bold shadow-lg">
                HR
              </div>
              <span className="text-xl">HackerRank</span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              <Link
                to="/"
                className={`nav-link ${
                  isActive('/') 
                    ? 'nav-link-active' 
                    : 'nav-link-inactive'
                }`}
              >
                Problems
              </Link>
              
              <Link
                to="/history"
                className={`nav-link ${
                  isActive('/history') 
                    ? 'nav-link-active' 
                    : 'nav-link-inactive'
                }`}
              >
                Submissions
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-hackerrank-textSecondary">
              <span>Ready to code?</span>
              <div className="w-2 h-2 bg-hackerrank-green rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}