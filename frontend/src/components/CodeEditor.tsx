import React from 'react'
import { Language } from '../types'
import { getLanguageConfig } from '../utils/language'

interface CodeEditorProps {
  language: Language
  value: string
  onChange: (value: string) => void
  readOnly?: boolean
  height?: string
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  language, 
  value, 
  onChange, 
  readOnly = false,
  height = '400px' 
}) => {
  const languageConfig = getLanguageConfig(language)

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle tab key for proper indentation
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      // Insert tab character
      const newValue = value.substring(0, start) + '  ' + value.substring(end)
      onChange(newValue)
      
      // Move cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <div className="code-editor-container h-full flex flex-col">
      <div className="code-editor-header">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">{languageConfig.name}</span>
          <span className="text-xs text-gray-500">{languageConfig.extension}</span>
        </div>
        {readOnly && (
          <div className="text-xs text-gray-500">Read Only</div>
        )}
      </div>
      
      <div className="code-editor-content flex-1 relative">
        <textarea
          value={value}
          onChange={handleTextAreaChange}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          className="code-editor-textarea w-full h-full"
          style={{ 
            height: height === '100%' ? '100%' : height,
            minHeight: height === '100%' ? '400px' : height,
            backgroundColor: readOnly ? '#f8f9fa' : 'white',
            resize: 'none',
          }}
          placeholder={readOnly ? '' : `Write your ${languageConfig.name} code here...`}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
        
        {/* Line numbers overlay */}
        <div className="absolute left-0 top-0 p-4 pointer-events-none select-none text-gray-400 text-sm font-mono leading-relaxed">
          {value.split('\n').map((_, index) => (
            <div key={index} className="text-right pr-2" style={{ minWidth: '2em' }}>
              {index + 1}
            </div>
          ))}
        </div>
        
        {/* Adjust textarea padding to make room for line numbers */}
        <style jsx>{`
          .code-editor-textarea {
            padding-left: ${Math.max(2, value.split('\n').length.toString().length) * 0.6 + 3}rem !important;
          }
        `}</style>
      </div>
    </div>
  )
}