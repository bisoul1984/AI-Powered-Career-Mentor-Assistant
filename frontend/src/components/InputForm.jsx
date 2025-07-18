import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

const InputForm = ({ onSubmit, isLoading, input, setInput }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSubmit(input)
      setInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tell me about your skills, interests, or career questions... (e.g., 'I like design and tech' or 'What can I do with HTML, CSS, and Python?')"
          className="input-field min-h-[100px] sm:min-h-[120px] pr-14 sm:pr-12 text-sm sm:text-base"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 p-2.5 sm:p-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px] touch-manipulation"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <div className="text-xs sm:text-sm text-gray-500 text-center px-2">
        Press Enter to send, Shift+Enter for new line
      </div>
    </form>
  )
}

export default InputForm 