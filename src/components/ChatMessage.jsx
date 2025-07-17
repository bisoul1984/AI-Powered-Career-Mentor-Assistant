import { useState } from 'react'
import { Copy, Download, User, Bot, AlertCircle, ThumbsUp, ThumbsDown } from 'lucide-react'

const ChatMessage = ({ message, onCopy, onDownload }) => {
  const { type, content, timestamp } = message
  const [feedback, setFeedback] = useState(null) // 'positive', 'negative', or null

  const getIcon = () => {
    switch (type) {
      case 'user':
        return <User className="h-6 w-6 text-blue-600" />
      case 'ai':
        return <Bot className="h-6 w-6 text-green-600" />
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-600" />
      default:
        return <User className="h-6 w-6 text-gray-600" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'user':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
      case 'ai':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
    }
  }

  const formatTime = (date) => {
    try {
      // Handle different date formats
      const dateObj = date instanceof Date ? date : new Date(date)
      
      // Check if the date is valid
      if (isNaN(dateObj.getTime())) {
        return 'Just now'
      }
      
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(dateObj)
    } catch (error) {
      console.warn('Error formatting time:', error)
      return 'Just now'
    }
  }

  const handleFeedback = (type) => {
    setFeedback(type)
    // Here you could send feedback to your backend
    console.log(`Feedback for message: ${type}`)
  }

  return (
    <div className={`card ${getBgColor()} animate-slide-up`}>
      <div className="flex items-start space-x-2 sm:space-x-3">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
              {type === 'user' ? 'You' : type === 'ai' ? 'AI Mentor' : 'Error'}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {formatTime(timestamp)}
            </span>
          </div>
          
          <div className="prose prose-sm max-w-none">
            {type === 'ai' ? (
              <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed text-sm sm:text-base">
                {content}
              </div>
            ) : (
              <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">{content}</p>
            )}
          </div>
          
          {/* Action buttons for AI responses */}
          {type === 'ai' && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 sm:mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-2">
                <button
                  onClick={() => onCopy(content)}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px] touch-manipulation"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={() => onDownload(content)}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px] touch-manipulation"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
              
              {/* Feedback buttons */}
              <div className="flex items-center space-x-3 sm:space-x-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">Was this helpful?</span>
                <button
                  onClick={() => handleFeedback('positive')}
                  className={`p-2 sm:p-1 rounded transition-colors duration-200 min-h-[44px] min-w-[44px] touch-manipulation ${
                    feedback === 'positive'
                      ? 'text-green-600 bg-green-100 dark:bg-green-900/30'
                      : 'text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                  }`}
                  disabled={feedback !== null}
                >
                  <ThumbsUp className="h-5 w-5 sm:h-4 sm:w-4" />
                </button>
                <button
                  onClick={() => handleFeedback('negative')}
                  className={`p-2 sm:p-1 rounded transition-colors duration-200 min-h-[44px] min-w-[44px] touch-manipulation ${
                    feedback === 'negative'
                      ? 'text-red-600 bg-red-100 dark:bg-red-900/30'
                      : 'text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                  disabled={feedback !== null}
                >
                  <ThumbsDown className="h-5 w-5 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage 