'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
      }}
      className="relative group p-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun Icon */}
        <SunIcon className={`absolute w-5 h-5 text-yellow-500 transition-all duration-500 ${
          isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
        }`} />
        
        {/* Moon Icon */}
        <MoonIcon className={`absolute w-5 h-5 text-purple-400 transition-all duration-500 ${
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
        }`} />
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm -z-10"></div>
    </button>
  )
}
