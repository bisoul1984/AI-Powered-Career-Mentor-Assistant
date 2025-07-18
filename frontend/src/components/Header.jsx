import { Brain, Sparkles, Sun, Moon } from 'lucide-react'

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary-600" />
            <Sparkles className="h-6 w-6 text-purple-500" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              AI Career Mentor
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Get personalized career guidance powered by AI
            </p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-6 w-6 text-yellow-400" />
          ) : (
            <Moon className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>
    </header>
  )
}

export default Header 