import { useState } from 'react'
import Header from './components/Header'
import CareerMentor from './components/CareerMentor'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CareerMentor />
      </main>
      <Footer />
    </div>
  )
}

export default App 