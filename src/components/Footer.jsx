import { Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Built with ❤️ by Bisrat Tadesse
          </p>
          
          <div className="flex items-center justify-center space-x-6 mb-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          
          <p className="text-sm text-gray-500">
            Powered by OpenAI GPT API • React • TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 