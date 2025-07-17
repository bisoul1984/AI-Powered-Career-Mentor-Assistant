import { Copy, Download, User, Bot, AlertCircle } from 'lucide-react'

const ChatMessage = ({ message, onCopy, onDownload }) => {
  const { type, content, timestamp } = message

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
        return 'bg-blue-50 border-blue-200'
      case 'ai':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className={`card ${getBgColor()} animate-slide-up`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">
              {type === 'user' ? 'You' : type === 'ai' ? 'AI Mentor' : 'Error'}
            </span>
            <span className="text-sm text-gray-500">
              {formatTime(timestamp)}
            </span>
          </div>
          
          <div className="prose prose-sm max-w-none">
            {type === 'ai' ? (
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {content}
              </div>
            ) : (
              <p className="text-gray-800">{content}</p>
            )}
          </div>
          
          {/* Action buttons for AI responses */}
          {type === 'ai' && (
            <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => onCopy(content)}
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={() => onDownload(content)}
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage 