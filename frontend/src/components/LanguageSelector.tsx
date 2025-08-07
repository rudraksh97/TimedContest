import React from 'react'
import { Language } from '../types'
import { getLanguageConfig } from '../utils/language'

interface LanguageSelectorProps {
  selectedLanguage: Language
  onChange: (language: Language) => void
  disabled?: boolean
}

const languages: Language[] = ['python', 'java', 'cpp', 'javascript']

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onChange, 
  disabled = false 
}) => {
  return (
    <div className="flex items-center space-x-1">
      <span className="text-sm text-hackerrank-textSecondary mr-2">Language:</span>
      <select
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value as Language)}
        disabled={disabled}
        className="text-sm border border-hackerrank-border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-hackerrank-green focus:border-transparent bg-hackerrank-light text-hackerrank-text"
      >
        {languages.map((language) => {
          const config = getLanguageConfig(language)
          return (
            <option key={language} value={language}>
              {config.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}