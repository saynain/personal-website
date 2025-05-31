'use client'

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-rose-500 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        <div className="mb-6 text-pink-400 text-lg">Hello, World! I&apos;m</div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-pink-400 to-purple-500 bg-clip-text text-transparent">
          Saynain
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
          IT Specialist • Engineer • Blockchain Enthusiast
        </p>
        <p className="text-lg mb-12 text-gray-400 max-w-3xl mx-auto">
          Building the future one commit at a time. Passionate about distributed systems, 
          cryptography, and creating elegant solutions to complex problems.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
          >
            View My Work
          </button>
          <a 
            href="https://github.com/saynain" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border-2 border-pink-400 px-8 py-3 rounded-lg font-semibold hover:bg-pink-400 hover:text-slate-900 transition-all duration-300"
          >
            GitHub Profile
          </a>
        </div>
      </div>
    </section>
  )
}
