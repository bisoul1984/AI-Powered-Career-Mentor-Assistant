import { useState } from 'react'
import { Send, Copy, Download, Loader2 } from 'lucide-react'
import ChatMessage from './ChatMessage'
import InputForm from './InputForm'

const CareerMentor = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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