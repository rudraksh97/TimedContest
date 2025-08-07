import React from 'react'

interface HtmlRendererProps {
  content: string
  className?: string
  maxHeight?: string
}

export const HtmlRenderer: React.FC<HtmlRendererProps> = ({ 
  content, 
  className = '',
  maxHeight = '200px' 
}) => {
  if (!content) return null;

  return (
    <>
      <style>{`
        .html-content * {
          all: revert !important;
        }
        .html-content p { 
          margin-bottom: 1rem !important; 
          line-height: 1.6 !important; 
          display: block !important;
        }
        .html-content code { 
          background-color: #f3f4f6 !important; 
          color: #374151 !important; 
          padding: 0.125rem 0.25rem !important; 
          border-radius: 0.25rem !important; 
          font-size: 0.875em !important; 
          font-weight: 600 !important; 
          font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace !important; 
          display: inline !important;
        }
        .html-content strong { 
          font-weight: 700 !important; 
          color: #111827 !important; 
          display: inline !important;
        }
        .html-content em { 
          font-style: italic !important; 
          display: inline !important;
        }
        .html-content pre { 
          background-color: #f9fafb !important; 
          border: 1px solid #e5e7eb !important; 
          border-radius: 0.5rem !important; 
          padding: 1rem !important; 
          margin: 1rem 0 !important; 
          overflow-x: auto !important; 
          font-size: 0.875rem !important; 
          line-height: 1.5 !important; 
          white-space: pre-wrap !important; 
          word-wrap: break-word !important; 
          display: block !important;
        }
        .html-content pre code {
          background: transparent !important;
          padding: 0 !important;
          font-weight: normal !important;
        }
        .html-content ul { 
          list-style-type: disc !important; 
          margin-left: 1.5rem !important; 
          margin-bottom: 1rem !important; 
          display: block !important;
        }
        .html-content ol { 
          list-style-type: decimal !important; 
          margin-left: 1.5rem !important; 
          margin-bottom: 1rem !important; 
          display: block !important;
        }
        .html-content li { 
          margin-bottom: 0.25rem !important; 
          display: list-item !important;
        }
        .html-content sup { 
          font-size: 0.75em !important; 
          vertical-align: super !important; 
        }
        .html-content .example { 
          font-weight: 600 !important; 
        }
        .html-content a { 
          color: #2563eb !important; 
          text-decoration: underline !important; 
          text-decoration-color: #2563eb !important; 
          text-decoration-thickness: 1px !important; 
          text-underline-offset: 2px !important;
        }
        .html-content a:hover { 
          color: #1d4ed8 !important; 
          text-decoration-color: #1d4ed8 !important; 
        }
        .html-content a:visited { 
          color: #7c3aed !important; 
          text-decoration-color: #7c3aed !important; 
        }
      `}</style>
      <div 
        className={`html-content ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ 
          maxHeight,
          overflowY: 'auto',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}
      />
    </>
  )
}
