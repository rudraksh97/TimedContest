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
    <div className="flex items-center space-x-2">
      <span className="text-sm text-meta-textSecondary font-medium">Language:</span>
      <select
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value as Language)}
        disabled={disabled}
        className="text-sm border border-meta-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-meta-blue focus:border-transparent bg-meta-light text-meta-text font-medium shadow-meta transition-all duration-200 hover:border-meta-borderLight"
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