import { Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Built with ❤️ by Bisrate Tadesse
          </p>
          
          <div className="flex items-center justify-center space-x-6 mb-4">
            <a
              href="https://github.com/bisoul1984"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/bisrate-tadesse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:bisrat.tadesse@example.com"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
              aria-label="Email Contact"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Powered by OpenAI GPT API • React • TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 