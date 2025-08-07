import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Attempt, Language, ContestTemplates, AttemptStatus } from '../types'
import { attemptAPI, contestAPI } from '../services/api'
import { Timer } from '../components/Timer'
import { CodeEditor } from '../components/CodeEditor'
import { LanguageSelector } from '../components/LanguageSelector'
import { difficultyColors } from '../utils/language'

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
  const saveTimeoutRef = useRef<NodeJS.Timeout>()

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
    <div className="h-screen flex flex-col bg-gradient-bg">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-meta-border bg-meta-darker/80 backdrop-blur-md px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(`/contest/${id}`)}
              className="btn btn-secondary btn-sm shadow-meta"
            >
              Back
            </button>
            
            <div>
              <h1 className="text-xl font-bold text-meta-text">
                {attempt.contest?.name}
              </h1>
              <p className="text-sm text-meta-textSecondary font-medium">
                Problem {activeQuestion} of 3
              </p>
            </div>
            
            {saving && (
              <div className="flex items-center space-x-2 text-sm text-meta-textSecondary">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-meta-blue"></div>
                <span className="font-medium">Saving...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={finishContest}
              className="btn btn-success btn-sm shadow-meta"
            >
              Submit
            </button>
            
            <button
              onClick={abandonContest}
              className="btn btn-danger btn-sm shadow-meta"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-meta-border bg-meta-light/50 backdrop-blur-sm">
        <Timer onTimeUp={handleTimeUp} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 flex flex-col border-r border-meta-border">
          {/* Problem Navigation */}
          <div className="flex-shrink-0 border-b border-meta-border bg-meta-darker/50 backdrop-blur-sm">
            <div className="flex">
              {questions.map((question, index) => (
                <button
                  key={question?.id}
                  onClick={() => setActiveQuestion(index + 1)}
                  className={`flex-1 px-4 py-3 text-sm font-semibold border-r border-meta-border last:border-r-0 transition-all duration-200 ${
                    activeQuestion === index + 1
                      ? 'bg-meta-blue/10 text-meta-blue border-b-2 border-meta-blue'
                      : 'text-meta-textSecondary hover:bg-meta-light hover:text-meta-text'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>{index + 1}. {question?.title}</span>
                    {codes[index + 1 as keyof typeof codes].code.trim() && (
                      <div className="w-2 h-2 bg-meta-blue rounded-full animate-pulse"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Problem Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-meta-light/50 backdrop-blur-sm">
            {questions[activeQuestion - 1] && (
              <div className="problem-description">
                <div className="flex items-center space-x-3 mb-6">
                  <h2 className="text-2xl font-bold text-meta-text">
                    {questions[activeQuestion - 1]?.title}
                  </h2>
                  <span className={`badge ${difficultyColors[questions[activeQuestion - 1]?.difficulty!]} border`}>
                    {questions[activeQuestion - 1]?.difficulty}
                  </span>
                </div>
                
                <div className="prose prose-sm max-w-none text-meta-textSecondary leading-relaxed">
                  <p className="text-base">{questions[activeQuestion - 1]?.description}</p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-meta-border text-sm text-meta-textSecondary">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Category: {questions[activeQuestion - 1]?.category}</span>
                    <span className="font-mono">Problem #{questions[activeQuestion - 1]?.neetcode_number}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col">
          {/* Editor Header */}
          <div className="flex-shrink-0 border-b border-meta-border bg-meta-darker/50 backdrop-blur-sm px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-meta-text">Code</h3>
              <LanguageSelector
                selectedLanguage={currentCode.language}
                onChange={handleLanguageChange}
              />
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1">
            <CodeEditor
              language={currentCode.language}
              value={currentCode.code}
              onChange={(value) => handleCodeChange(activeQuestion, value)}
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>
  )
}