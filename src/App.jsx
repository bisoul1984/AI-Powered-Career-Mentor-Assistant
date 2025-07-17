import { useState, useEffect } from 'react'
import Header from './components/Header'
import CareerMentor from './components/CareerMentor'
import Footer from './components/Footer'

const THEME_KEY = 'careerMentorTheme'

function App() {
  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY)
    return saved || 'light'
  })

  // Apply theme class to html element
  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto px-4 py-8">
        <CareerMentor />
      </main>
      <Footer />
    </div>
  )
}

export default App 