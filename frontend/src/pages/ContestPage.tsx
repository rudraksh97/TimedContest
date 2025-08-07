import React, { useState, useEffect, useRef } from 'react'
import { Contest, Attempt, Language, ContestTemplates, AttemptStatus } from '../types'
import { Timer } from '../components/Timer'
import { CodeEditor } from '../components/CodeEditor'
import { LanguageSelector } from '../components/LanguageSelector'
import { QuestionCard } from '../components/QuestionCard'

interface ContestPageProps {
  contestId: number
  attemptId?: string
}

export const ContestPage: React.FC<ContestPageProps> = ({ contestId, attemptId }) => {
  const [contest, setContest] = useState<Contest | null>(null)
  const [attempt, setAttempt] = useState<Attempt | null>(null)
  const [templates, setTemplates] = useState<ContestTemplates | null>(null)
  const [activeQuestion, setActiveQuestion] = useState(1)
  const [currentLanguage, setCurrentLanguage] = useState<Language>('python')
  const [codes, setCodes] = useState({
    1: { code: '', language: 'python' as Language },
    2: { code: '', language: 'python' as Language },
    3: { code: '', language: 'python' as Language },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const saveTimeoutRef = useRef<number>()

  useEffect(() => {
    fetchData()
  }, [contestId, attemptId])

  const fetchData = async () => {
    try {
      // Fetch contest details
      const contestResponse = await fetch(`http://localhost:8000/contests/${contestId}`)
      if (!contestResponse.ok) throw new Error('Failed to load contest')
      const contestData = await contestResponse.json()
      setContest(contestData)

      // Fetch templates
      const templatesResponse = await fetch(`http://localhost:8000/contests/${contestId}/templates`)
      if (!templatesResponse.ok) throw new Error('Failed to load templates')
      const templatesData = await templatesResponse.json()
      setTemplates(templatesData)

      // If we have an attempt ID, fetch attempt data
      if (attemptId) {
        const attemptResponse = await fetch(`http://localhost:8000/attempts/${attemptId}`)
        if (!attemptResponse.ok) throw new Error('Failed to load attempt')
        const attemptData = await attemptResponse.json()
        setAttempt(attemptData)

        // Load existing code if any
        const newCodes = { ...codes }
        if (attemptData.question1_code) {
          newCodes[1] = { 
            code: attemptData.question1_code, 
            language: attemptData.question1_language || 'python'
          }
        } else {
          newCodes[1] = {
            code: templatesData.question1.templates.python || '',
            language: 'python'
          }
        }

        if (attemptData.question2_code) {
          newCodes[2] = { 
            code: attemptData.question2_code, 
            language: attemptData.question2_language || 'python'
          }
        } else {
          newCodes[2] = {
            code: templatesData.question2.templates.python || '',
            language: 'python'
          }
        }

        if (attemptData.question3_code) {
          newCodes[3] = { 
            code: attemptData.question3_code, 
            language: attemptData.question3_language || 'python'
          }
        } else {
          newCodes[3] = {
            code: templatesData.question3.templates.python || '',
            language: 'python'
          }
        }

        setCodes(newCodes)
        setCurrentLanguage(newCodes[1].language)
      } else {
        // Start new attempt
        const attemptResponse = await fetch('http://localhost:8000/attempts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contest_id: contestId }),
        })
        if (!attemptResponse.ok) throw new Error('Failed to start attempt')
        const newAttempt = await attemptResponse.json()
        setAttempt(newAttempt)

        // Set initial templates
        const newCodes = {
          1: { code: templatesData.question1.templates.python || '', language: 'python' as Language },
          2: { code: templatesData.question2.templates.python || '', language: 'python' as Language },
          3: { code: templatesData.question3.templates.python || '', language: 'python' as Language },
        }
        setCodes(newCodes)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contest')
    } finally {
      setLoading(false)
    }
  }

  const debouncedSave = (updatedCodes = codes) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      saveAttempt(updatedCodes)
    }, 1000)
  }

  const saveAttempt = async (codesToSave = codes) => {
    if (!attempt) return
    
    try {
      const update = {
        question1_code: codesToSave[1].code,
        question1_language: codesToSave[1].language,
        question2_code: codesToSave[2].code,
        question2_language: codesToSave[2].language,
        question3_code: codesToSave[3].code,
        question3_language: codesToSave[3].language,
      }
      
      await fetch(`http://localhost:8000/attempts/${attempt.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
      })
    } catch (err) {
      console.error('Error saving attempt:', err)
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

  const handleLanguageChange = (questionNum: number, language: Language) => {
    const questionTemplate = getTemplateForQuestion(questionNum, language)
    
    const updatedCodes = {
      ...codes,
      [questionNum]: { code: questionTemplate, language }
    }
    setCodes(updatedCodes)
    setCurrentLanguage(language)
    debouncedSave(updatedCodes)
  }

  const getTemplateForQuestion = (questionNum: number, language: Language): string => {
    if (!templates) return ''
    
    const questionKey = `question${questionNum}` as keyof ContestTemplates
    const question = templates[questionKey]
    return question.templates[language] || ''
  }

  const handleTimeUp = async () => {
    alert('⏰ Time\'s up! Contest completed.')
    await finishContest()
  }

  const finishContest = async () => {
    if (!attempt) return
    
    try {
      await fetch(`http://localhost:8000/attempts/${attempt.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'completed' as AttemptStatus,
          completed_at: new Date().toISOString(),
        }),
      })
      
      alert('Contest completed! Your solutions have been saved.')
      window.location.href = '/'
    } catch (err) {
      alert('Failed to complete contest')
    }
  }

  const abandonContest = async () => {
    if (!confirm('Are you sure you want to abandon this contest?')) return
    
    try {
      if (attempt) {
        await fetch(`http://localhost:8000/attempts/${attempt.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'abandoned' as AttemptStatus }),
        })
      }
      
      alert('Contest abandoned')
      window.location.href = '/'
    } catch (err) {
      alert('Failed to abandon contest')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-meta-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-meta-blue mx-auto mb-4"></div>
          <p className="text-meta-textSecondary">Loading contest...</p>
        </div>
      </div>
    )
  }

  if (error || !contest || !templates) {
    return (
      <div className="min-h-screen bg-meta-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-meta-error text-xl mb-4">❌ Error</div>
          <p className="text-meta-textSecondary">{error || 'Failed to load contest'}</p>
          <button 
            onClick={() => window.location.href = '/'} 
            className="mt-4 px-4 py-2 bg-meta-blue text-white rounded hover:bg-meta-blueDark"
          >
            Back to Contests
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = templates[`question${activeQuestion}` as keyof ContestTemplates]
  const currentCode = codes[activeQuestion as keyof typeof codes]

  return (
    <div className="min-h-screen bg-meta-dark">
      {/* Header */}
      <div className="bg-white shadow-meta border-b border-meta-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 bg-white text-meta-text border-meta-border hover:bg-meta-lighter focus:ring-meta-blue"
              >
                ← Back
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-meta-text">{contest.name}</h1>
                <p className="text-meta-textSecondary">Question {activeQuestion} of 3</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => saveAttempt()}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 bg-white text-meta-text border-meta-border hover:bg-meta-lighter focus:ring-meta-blue"
              >
                💾 Save
              </button>
              
              <button
                onClick={finishContest}
                className="px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 bg-meta-success text-white hover:bg-meta-success/90 focus:ring-meta-success"
              >
                ✅ Finish
              </button>
              
              <button
                onClick={abandonContest}
                className="px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 bg-meta-error text-white hover:bg-meta-error/90 focus:ring-meta-error"
              >
                ❌ Abandon
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Timer */}
        <Timer onTimeUp={handleTimeUp} />

        {/* Question Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setActiveQuestion(num)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 bg-white text-meta-text border-meta-border hover:bg-meta-lighter focus:ring-meta-blue"
                ${
                  activeQuestion === num
                    ? 'bg-meta-blue text-white'
                    : 'bg-white text-meta-text border border-meta-border hover:bg-meta-lighter'
                }`}
              >
                Q{num}
                {codes[num as keyof typeof codes].code.trim() && (
                  <span className="ml-2 w-2 h-2 bg-meta-success rounded-full inline-block" />
                )}
              </button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveQuestion(Math.max(1, activeQuestion - 1))}
              disabled={activeQuestion === 1}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 bg-white text-meta-text border-meta-border hover:bg-meta-lighter focus:ring-meta-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            
            <button
              onClick={() => setActiveQuestion(Math.min(3, activeQuestion + 1))}
              disabled={activeQuestion === 3}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 bg-white text-meta-text border-meta-border hover:bg-meta-lighter focus:ring-meta-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Question Panel */}
          <div className="space-y-4">
            {contest && (
              <QuestionCard
                question={
                  activeQuestion === 1 ? contest.question1! :
                  activeQuestion === 2 ? contest.question2! :
                  contest.question3!
                }
                questionNumber={activeQuestion}
                userCode={currentCode.code}
                userLanguage={currentCode.language}
              />
            )}
          </div>

          {/* Code Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-meta-text">Code Editor</h3>
              <LanguageSelector
                selectedLanguage={currentCode.language}
                onChange={(language) => handleLanguageChange(activeQuestion, language)}
              />
            </div>
            
            <CodeEditor
              language={currentCode.language}
              value={currentCode.code}
              onChange={(value) => handleCodeChange(activeQuestion, value)}
              height="500px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

