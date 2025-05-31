'use client'

import { useState, useEffect } from 'react'

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
      isScrolled ? 'bg-slate-900/95 backdrop-blur-sm' : 'bg-slate-900/80'
    } border-b border-purple-800/30`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-pink-400 font-bold text-xl">&lt;dev/&gt;</div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('home')} className="hover:text-pink-400 transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('terminal')} className="hover:text-pink-400 transition-colors">
              Terminal
            </button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-pink-400 transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-pink-400 transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-pink-400 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
