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
    <nav className="bg-white/80 backdrop-blur-md border-b border-meta-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-lg font-bold text-meta-text hover:text-meta-blue transition-all duration-200 group"
            >
              <div className="w-10 h-10 meta-gradient rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-meta group-hover:shadow-meta-lg transition-all duration-200">
                C
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-meta-blue to-meta-blueLight bg-clip-text text-transparent">
                CodeContest
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-2">
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
            <div className="hidden sm:flex items-center space-x-3 text-sm text-meta-textSecondary">
              <span className="font-medium">Ready to code?</span>
              <div className="w-2 h-2 bg-meta-blue rounded-full animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}