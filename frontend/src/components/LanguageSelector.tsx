import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Language } from '../types'
import { getLanguageConfig } from '../utils/language'

interface LanguageSelectorProps {
  selectedLanguage: Language
  onChange: (language: Language) => void
  disabled?: boolean
}

const languages: Language[] = ['python', 'java', 'cpp', 'javascript', 'go', 'c']

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onChange, 
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
          dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleButtonClick = () => {
    if (disabled) return
    
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.right - 192, // 192px is the width of the dropdown (w-48)
        width: rect.width
      })
    }
    
    setIsOpen(!isOpen)
  }

  const selectedConfig = getLanguageConfig(selectedLanguage)

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        disabled={disabled}
        className="flex items-center space-x-2 px-4 py-2.5 rounded-lg border-2 border-meta-border bg-white text-meta-text font-medium shadow-sm hover:border-meta-borderLight hover:shadow-md focus:outline-none focus:ring-2 focus:ring-meta-blue/20 focus:border-meta-blue transition-all duration-200"
      >
        <span className="text-lg">{selectedConfig.icon}</span>
        <span className="text-sm font-semibold">{selectedConfig.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed bg-white rounded-lg shadow-lg border border-meta-border/50 py-1 z-[9999]"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: '192px'
          }}
        >
          {languages.map((language) => {
            const config = getLanguageConfig(language)
            const isSelected = language === selectedLanguage
            
            return (
              <button
                key={language}
                onClick={() => {
                  console.log('Language selected:', language)
                  onChange(language)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left transition-all duration-150 hover:bg-meta-lighter ${
                  isSelected ? 'bg-meta-blue/10 text-meta-blue' : 'text-meta-text hover:text-meta-text'
                }`}
              >
                <span className="text-lg">{config.icon}</span>
                <span className="text-sm font-medium">{config.name}</span>
                {isSelected && (
                  <svg 
                    className="w-4 h-4 ml-auto text-meta-blue" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>,
        document.body
      )}
    </>
  )
}