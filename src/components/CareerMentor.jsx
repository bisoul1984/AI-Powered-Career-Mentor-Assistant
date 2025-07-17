import { useState, useEffect } from 'react'
import { Send, Copy, Download, Loader2, Trash2 } from 'lucide-react'
import ChatMessage from './ChatMessage'
import InputForm from './InputForm'

const LOCAL_STORAGE_KEY = 'careerMentorChatHistory'

const CareerMentor = () => {
  // Load messages from localStorage if available
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [isLoading, setIsLoading] = useState(false)

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages))
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mb-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Your AI Career Mentor
          </h2>
          <p className="text-gray-600">
            Tell me about your skills, interests, or career questions. I'll provide personalized guidance and learning paths.
          </p>
        </div>

        <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      {/* Messages */}
      <div className="space-y-4">
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
      </div>

      {/* Clear Chat Button */}
      {messages.length > 0 && !isLoading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={clearChat}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Chat</span>
          </button>
        </div>
      )}

      {/* Empty state */}
      {messages.length === 0 && !isLoading && (
        <div className="card text-center">
          <div className="text-gray-500">
            <p className="text-lg mb-2">👋 Welcome to your AI Career Mentor!</p>
            <p className="mb-4">Try asking questions like:</p>
            <div className="space-y-2 text-sm">
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