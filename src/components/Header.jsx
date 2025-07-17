import { Brain, Sparkles } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary-600" />
            <Sparkles className="h-6 w-6 text-purple-500" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              AI Career Mentor
            </h1>
            <p className="text-gray-600 mt-1">
              Get personalized career guidance powered by AI
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 