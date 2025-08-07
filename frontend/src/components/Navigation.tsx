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
    <nav className="glass-light border-b border-meta-border/50 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-lg font-bold text-meta-text hover:text-meta-primary transition-all duration-200"
          >
            <div className="w-8 h-8 bg-slate-800 rounded-xl flex items-center justify-center text-white text-sm font-bold">
              C
            </div>
            <span className="text-xl font-bold text-slate-800">
              CodeContest
            </span>
          </Link>
          
          <div className="flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-slate-100 text-slate-800' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              Problems
            </Link>
            
            <Link
              to="/history"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/history') 
                  ? 'bg-slate-100 text-slate-800' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}