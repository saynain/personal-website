'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm' 
        : 'bg-white/80 dark:bg-slate-900/80'
    } border-b border-gray-200 dark:border-purple-800/30`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-pink-400 font-bold text-xl">&lt;dev/&gt;</div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-gray-700 dark:text-white hover:text-pink-400 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('terminal')} 
                className="text-gray-700 dark:text-white hover:text-pink-400 transition-colors"
              >
                Terminal
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-700 dark:text-white hover:text-pink-400 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="text-gray-700 dark:text-white hover:text-pink-400 transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-700 dark:text-white hover:text-pink-400 transition-colors"
              >
                Contact
              </button>
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
