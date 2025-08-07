import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Attempt, Language, ContestTemplates } from '../types'
import { attemptAPI, contestAPI } from '../services/api'
import { Timer } from '../components/Timer'
import { CodeEditor } from '../components/CodeEditor'
import { LanguageSelector } from '../components/LanguageSelector'
import { difficultyColors } from '../utils/language'
import { decodeHtmlEntities } from '../utils/html'

export const ContestAttempt: React.FC = () => {
  const { id, attemptId } = useParams<{ id: string; attemptId: string }>()
  const navigate = useNavigate()
  const [attempt, setAttempt] = useState<Attempt | null>(null)
  const [templates, setTemplates] = useState<ContestTemplates | null>(null)
  const [activeQuestion, setActiveQuestion] = useState(1)
  const [codes, setCodes] = useState({
    1: { code: '', language: 'python' as Language },
    2: { code: '', language: 'python' as Language },
    3: { code: '', language: 'python' as Language },
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const saveTimeoutRef = useRef<number>()

  useEffect(() => {
    fetchData()
  }, [id, attemptId])

  const fetchData = async () => {
    if (!id || !attemptId) return
    
    try {
      const [attemptData, templatesData] = await Promise.all([
        attemptAPI.getById(attemptId),
        contestAPI.getTemplates(parseInt(id))
      ])
      
      setAttempt(attemptData)
      setTemplates(templatesData)
      
      // Load existing code
      const newCodes = { ...codes }
      for (let i = 1; i <= 3; i++) {
        const questionKey = `question${i}` as const
        const codeKey = `question${i}_code` as keyof Attempt
        const langKey = `question${i}_language` as keyof Attempt
        
        if (attemptData[codeKey]) {
          newCodes[i as keyof typeof codes] = { 
            code: attemptData[codeKey] as string, 
            language: (attemptData[langKey] as Language) || 'python'
          }
        } else {
          newCodes[i as keyof typeof codes] = {
            code: templatesData[questionKey].templates.python || '',
            language: 'python'
          }
        }
      }
      
      setCodes(newCodes)
    } catch (error) {
      console.error('Error fetching attempt:', error)
    } finally {
      setLoading(false)
    }
  }

  const debouncedSave = (updatedCodes = codes) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    
    setSaving(true)
    saveTimeoutRef.current = setTimeout(async () => {
      await saveAttempt(updatedCodes)
      setSaving(false)
    }, 1000)
  }

  const saveAttempt = async (codesToSave = codes) => {
    if (!attemptId) return
    
    try {
      const update = {
        question1_code: codesToSave[1].code,
        question1_language: codesToSave[1].language,
        question2_code: codesToSave[2].code,
        question2_language: codesToSave[2].language,
        question3_code: codesToSave[3].code,
        question3_language: codesToSave[3].language,
      }
      
      await attemptAPI.update(attemptId, update)
    } catch (error) {
      console.error('Error saving attempt:', error)
    }
  }

  const handleCodeChange = (questionNum: number, newCode: string) => {
    const updatedCodes = {
      ...codes,
      [questionNum]: { ...codes[questionNum as keyof typeof codes], code: newCode }
    }
    setCodes(updatedCodes)
    debouncedSave(updatedCodes)
  }

  const handleLanguageChange = (language: Language) => {
    const updatedCodes = {
      ...codes,
      [activeQuestion]: { ...codes[activeQuestion as keyof typeof codes], language }
    }
    setCodes(updatedCodes)
    debouncedSave(updatedCodes)
  }

  const getTemplateForQuestion = (questionNum: number, language: Language): string => {
    const questionKey = `question${questionNum}` as keyof ContestTemplates
    return templates?.[questionKey]?.templates[language] || ''
  }

  const handleTimeUp = async () => {
    await finishContest()
  }

  const finishContest = async () => {
    if (!attemptId) return
    
    try {
      await attemptAPI.update(attemptId, { status: 'completed' })
      navigate(`/attempt/${attemptId}/review`)
    } catch (error) {
      console.error('Error finishing contest:', error)
    }
  }

  const abandonContest = async () => {
    if (!attemptId || !id) return
    
    if (!confirm('Are you sure you want to abandon this contest? Your progress will be lost.')) {
      return
    }
    
    try {
      await attemptAPI.update(attemptId, { status: 'abandoned' })
      navigate(`/contest/${id}`)
    } catch (error) {
      console.error('Error abandoning contest:', error)
    }
  }

  if (loading || !attempt || !templates) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-meta-blue mx-auto mb-4"></div>
          <p className="text-meta-textSecondary text-lg font-medium">Loading contest...</p>
        </div>
      </div>
    )
  }

  const currentQuestion = templates[`question${activeQuestion}` as keyof ContestTemplates]
  const currentCode = codes[activeQuestion as keyof typeof codes]
  const questions = [attempt.contest?.question1, attempt.contest?.question2, attempt.contest?.question3].filter(Boolean)

  return (
    <div className="h-screen bg-gradient-bg">
      {/* Top Header - HackerRank Style */}
      <div className="glass-light border-b border-meta-border/50 h-16 flex items-center px-6">
        <div className="flex items-center justify-between w-full">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/contest/${id}`)}
              className="text-meta-textSecondary hover:text-meta-text transition-colors text-sm"
              title="View contest history and details"
            >
              ← Contest Info
            </button>
            <div className="text-meta-text font-semibold">{attempt.contest?.name}</div>
          </div>
          
          {/* Center - Timer */}
          <div className="flex-1 flex justify-center">
            <Timer onTimeUp={handleTimeUp} />
          </div>
          
          {/* Right side */}
          <div className="flex items-center space-x-3">
            {saving && (
              <div className="flex items-center space-x-2 text-meta-textSecondary">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-meta-primary"></div>
                <span className="text-sm">Saving...</span>
              </div>
            )}
            
            <button
              onClick={finishContest}
              className="btn-glass text-meta-primary hover:bg-meta-primary hover:text-white"
            >
              Submit
            </button>
            
            <button
              onClick={abandonContest}
              className="glass rounded-lg px-4 py-2 text-meta-textSecondary hover:text-meta-text transition-colors"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout - HackerRank Style Split */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 flex flex-col">
          {/* Problem Tabs */}
          <div className="glass-light border-b border-meta-border/30 h-12 flex items-center">
            <div className="flex w-full">
              {questions.map((question, index) => (
                <button
                  key={question?.id}
                  onClick={() => setActiveQuestion(index + 1)}
                  className={`flex-1 px-4 py-3 text-sm font-medium border-r border-meta-border/30 last:border-r-0 transition-all duration-200 relative h-12 flex items-center justify-center ${
                    activeQuestion === index + 1
                      ? 'text-meta-primary bg-white/50'
                      : 'text-meta-textSecondary hover:text-meta-text hover:bg-white/30'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{index + 1}. {question?.title}</span>
                    {codes[index + 1 as keyof typeof codes].code.trim() && (
                      <div className="w-1.5 h-1.5 bg-meta-primary rounded-full"></div>
                    )}
                  </div>
                  {activeQuestion === index + 1 && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-meta-primary"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Problem Content - HackerRank Style */}
          <div className="flex-1 overflow-y-auto">
            {questions[activeQuestion - 1] && (
              <div className="p-6">
                {/* Problem Title */}
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-meta-text">
                    {questions[activeQuestion - 1]?.title}
                  </h1>
                </div>
                
                {/* Problem Description */}
                <div className="glass rounded-2xl p-6 mb-6">
                  <div className="prose prose-sm max-w-none text-meta-text">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {decodeHtmlEntities(questions[activeQuestion - 1]?.description || '')}
                    </div>
                  </div>
                </div>
                
                {/* Problem Info */}
                <div className="glass rounded-xl p-4 text-sm">
                  <div className="flex items-center justify-between text-meta-textSecondary">
                    <span><strong>Problem:</strong> #{questions[activeQuestion - 1]?.neetcode_number}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-meta-border"></div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col">
          {/* Code Editor Header */}
          <div className="glass-light border-b border-meta-border/30 px-6 py-3 h-12 flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-meta-text">Code</span>
                <span className="text-xs text-meta-textSecondary">
                  Problem {activeQuestion} of {questions.length}
                </span>
              </div>
              <LanguageSelector
                selectedLanguage={currentCode.language}
                onChange={handleLanguageChange}
              />
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 relative">
            <CodeEditor
              language={currentCode.language}
              value={currentCode.code}
              onChange={(value) => handleCodeChange(activeQuestion, value)}
              height="100%"
            />
          </div>

          {/* Bottom Action Bar */}
          <div className="glass-light border-t border-meta-border/30 px-6 py-4 h-16 flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-4">
                <button
                  disabled={activeQuestion === 1}
                  onClick={() => setActiveQuestion(activeQuestion - 1)}
                  className={`glass rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeQuestion === 1 
                      ? 'text-meta-textMuted cursor-not-allowed' 
                      : 'text-meta-textSecondary hover:text-meta-text'
                  }`}
                >
                  ← Previous
                </button>
                <button
                  disabled={activeQuestion === questions.length}
                  onClick={() => setActiveQuestion(activeQuestion + 1)}
                  className={`glass rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeQuestion === questions.length 
                      ? 'text-meta-textMuted cursor-not-allowed' 
                      : 'text-meta-textSecondary hover:text-meta-text'
                  }`}
                >
                  Next →
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="glass rounded-lg px-4 py-2 text-sm font-medium text-meta-textSecondary hover:text-meta-text transition-colors">
                  Run Code
                </button>
                <button 
                  onClick={finishContest}
                  className="btn-glass text-meta-primary hover:bg-meta-primary hover:text-white font-semibold"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}