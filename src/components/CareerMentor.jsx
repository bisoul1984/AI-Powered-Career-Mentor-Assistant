import { useState, useEffect } from 'react'
import { Send, Copy, Download, Loader2, Trash2 } from 'lucide-react'
import ChatMessage from './ChatMessage'
import InputForm from './InputForm'
import { useRef } from 'react'

const LOCAL_STORAGE_KEY = 'careerMentorChatHistory'

const CareerMentor = () => {
  // Load messages from localStorage if available
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSubmit = async (userInput) => {
    if (!userInput.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/career-guidance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const downloadResponse = (content) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'career-guidance.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadConversation = () => {
    if (messages.length === 0) return
    const lines = messages.map((msg) => {
      const who = msg.type === 'user' ? 'You' : msg.type === 'ai' ? 'AI Mentor' : 'Error'
      const time = new Date(msg.timestamp).toLocaleTimeString()
      return `[${time}] ${who}:\n${msg.content}\n`
    })
    const text = lines.join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'career-mentor-conversation.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exampleQuestions = [
    "I like design and technology, what careers should I consider?",
    "What can I do with HTML, CSS, and Python skills?",
    "I'm interested in data science, what should I learn next?",
    "How can I transition from teaching to tech?",
    "What are high-paying remote jobs for creative people?"
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="card mb-4 sm:mb-6">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            Your AI Career Mentor
          </h2>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            Tell me about your skills, interests, or career questions. I'll provide personalized guidance and learning paths.
          </p>
        </div>

        <InputForm onSubmit={handleSubmit} isLoading={isLoading} input={input} setInput={setInput} />

        {/* Example Questions */}
        <div className="flex flex-wrap gap-2 justify-center mt-3 sm:mt-4 mb-4 sm:mb-6 px-2">
          {exampleQuestions.map((q, i) => (
            <button
              key={i}
              type="button"
              className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 hover:bg-primary-100 text-gray-700 rounded-full border border-gray-200 text-xs sm:text-sm transition-colors duration-150 min-h-[44px] touch-manipulation"
              onClick={() => setInput(q)}
              tabIndex={0}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-3 sm:space-y-4" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message}
            onCopy={copyToClipboard}
            onDownload={downloadResponse}
          />
        ))}
        
        {isLoading && (
          <div className="card animate-fade-in">
            <div className="flex items-center space-x-3">
              <Loader2 className="h-5 w-5 text-primary-600 animate-spin" />
              <span className="text-gray-600">AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Clear Chat Button */}
      {messages.length > 0 && !isLoading && (
        <div className="flex justify-center mt-4 sm:mt-6">
          <button
            onClick={clearChat}
            className="flex items-center space-x-2 px-4 py-3 sm:py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 min-h-[44px] touch-manipulation"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Chat</span>
          </button>
        </div>
      )}

      {/* Export Chat Button */}
      {messages.length > 0 && !isLoading && (
        <div className="flex justify-center mt-2 sm:mt-3">
          <button
            onClick={downloadConversation}
            className="flex items-center space-x-2 px-4 py-3 sm:py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 min-h-[44px] touch-manipulation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
            <span>Export Chat</span>
          </button>
        </div>
      )}

      {/* Empty state */}
      {messages.length === 0 && !isLoading && (
        <div className="card text-center">
          <div className="text-gray-500 px-4">
            <p className="text-base sm:text-lg mb-2">👋 Welcome to your AI Career Mentor!</p>
            <p className="mb-4 text-sm sm:text-base">Try asking questions like:</p>
            <div className="space-y-2 text-xs sm:text-sm">
              <p>"I like design and technology, what careers should I consider?"</p>
              <p>"What can I do with HTML, CSS, and Python skills?"</p>
              <p>"I'm interested in data science, what should I learn next?"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CareerMentor 