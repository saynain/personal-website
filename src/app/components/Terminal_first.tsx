'use client'

import { useState, useEffect, useRef } from 'react'

interface Command {
  command: string
  output: string[]
  delay?: number
}

export default function Terminal() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTypingCommand, setIsTypingCommand] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [displayedCommands, setDisplayedCommands] = useState<Array<{
    command: string
    output: string[]
    completed: boolean
  }>>([])
  
  const terminalContentRef = useRef<HTMLDivElement>(null)

  const commands: Command[] = [
    {
      command: "whoami",
      output: [
        "Saynain - Full Stack Developer & Blockchain Engineer",
        "🚀 Passionate about building the future with code",
        "🔗 Specializing in Web3, DeFi, and distributed systems"
      ],
      delay: 2000
    },
    {
      command: "location",
      output: [
        "📍 Based in Norway 🇳🇴",
        "🌍 Available for remote work globally",
        "🕐 Timezone: Europe/Oslo (CET/CEST)"
      ],
      delay: 2000
    },
    {
      command: "education",
      output: [
        "🎓 Computer Science & Engineering",
        "📚 Self-taught blockchain development",
        "🧠 Continuous learner - always exploring new tech",
        "💡 Open source contributor"
      ],
      delay: 2000
    },
    {
      command: "cat skills.json",
      output: [
        '{',
        '  "languages": ["TypeScript", "Python", "Rust", "Solidity"],',
        '  "frameworks": ["React", "Next.js", "Node.js", "Express"],',
        '  "blockchain": ["Ethereum", "Web3.js", "Smart Contracts"],',
        '  "databases": ["PostgreSQL", "MongoDB", "Redis"],',
        '  "tools": ["Docker", "AWS", "Git", "Linux"]',
        '}'
      ],
      delay: 3000
    },
    {
      command: "crypto-wallet --balance",
      output: [
        "₿ BTC    ↗ +12.5%    Portfolio: 40%",
        "Ξ ETH    ↗ +8.2%     Portfolio: 35%", 
        "⬟ SOL    ↘ -2.1%     Portfolio: 15%",
        "💎 Other ↗ +5.8%     Portfolio: 10%",
        "",
        "🔥 DeFi protocols: Uniswap, Aave, Compound"
      ],
      delay: 1000
    }
  ]

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight
    }
  }, [displayedCommands, currentCharIndex])

  // Typing effect - runs only once
  useEffect(() => {
    if (animationComplete || currentCommandIndex >= commands.length) {
      // Animation is complete, mark it as done
      if (!animationComplete && currentCommandIndex >= commands.length) {
        setAnimationComplete(true)
      }
      return
    }

    const currentCommand = commands[currentCommandIndex]

    if (isTypingCommand) {
      // Typing the command
      if (currentCharIndex < currentCommand.command.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex + 1)
        }, 100) // Typing speed
        return () => clearTimeout(timeout)
      } else {
        // Command fully typed, wait a moment then show output and move to next
        const timeout = setTimeout(() => {
          // Add the completed command with output to displayed commands
          setDisplayedCommands(prev => [...prev, {
            command: currentCommand.command,
            output: currentCommand.output,
            completed: true
          }])
          
          // Move to next command
          setCurrentCommandIndex(currentCommandIndex + 1)
          setCurrentCharIndex(0)
          setIsTypingCommand(true)
        }, currentCommand.delay || 500)
        return () => clearTimeout(timeout)
      }
    }
  }, [currentCommandIndex, currentCharIndex, isTypingCommand, animationComplete, commands])

  const getCurrentTypedCommand = () => {
    if (currentCommandIndex >= commands.length) return ""
    return commands[currentCommandIndex].command.slice(0, currentCharIndex)
  }

  const isCommandFullyTyped = () => {
    if (currentCommandIndex >= commands.length) return false
    return currentCharIndex >= commands[currentCommandIndex].command.length
  }

  return (
    <section id="terminal" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-pink-400">
          Live Terminal Demo
        </h2>
        
        {/* Terminal Window - Fixed Size */}
        <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 text-center text-gray-400 text-sm font-medium">
              saynain@terminal:~$ 
            </div>
          </div>
          
          {/* Terminal Content - Fixed Height with Scroll */}
          <div 
            ref={terminalContentRef}
            className="p-6 space-y-3 text-sm h-96 overflow-y-auto font-mono bg-gray-900 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          >
            {/* Welcome Message */}
            <div className="flex items-center space-x-2">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">echo "Welcome to my portfolio!"</span>
            </div>
            <div className="ml-4 text-gray-300 mb-4">
              Welcome to my portfolio! I'm a passionate developer and blockchain enthusiast.
            </div>
            
            {/* Display completed commands */}
            {displayedCommands.map((cmd, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">portfolio</span>
                  <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">main</span>
                  <span className="text-white">{cmd.command}</span>
                </div>
                <div className="ml-4 space-y-1">
                  {cmd.output.map((line, lineIndex) => (
                    <div 
                      key={lineIndex} 
                      className={`${
                        line.startsWith('{') || line.startsWith('}') || line.includes(':') 
                          ? 'text-yellow-300' 
                          : line.includes('↗') 
                            ? 'text-green-400'
                            : line.includes('↘')
                              ? 'text-red-400'
                              : 'text-gray-300'
                      } animate-fade-in`}
                      style={{
                        animationDelay: `${lineIndex * 150}ms`
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Current typing command - only show if animation is not complete */}
            {!animationComplete && currentCommandIndex < commands.length && (
              <div className="flex items-center space-x-2">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">portfolio</span>
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">main</span>
                <span className="text-white">
                  {getCurrentTypedCommand()}
                  {!isCommandFullyTyped() && (
                    <span className="animate-ping bg-purple-400 w-2 h-5 inline-block ml-1"></span>
                  )}
                </span>
              </div>
            )}
            
            {/* Final cursor when animation is complete */}
            {animationComplete && (
              <div className="flex items-center space-x-2 mt-4">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">portfolio</span>
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">main</span>
                <span className="text-white">_</span>
                <span className="animate-pulse w-2 h-5 bg-purple-400 inline-block"></span>
              </div>
            )}
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
            <div className={`w-2 h-2 rounded-full ${
              animationComplete ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'
            }`}></div>
            <span>
              {animationComplete ? 'Terminal demo completed' : 'Live terminal simulation'}
            </span>
            {animationComplete && (
              <>
                <span>•</span>
                <span>Refresh page to replay</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
