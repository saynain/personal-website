'use client'

import { useState } from 'react'

export default function Terminal() {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])

  const clearTerminal = () => {
    setTerminalOutput([])
  }

  const runRandomCommand = () => {
    const commands = [
      'npm install happiness',
      'git commit -m "Fixed everything 🚀"',
      'docker run --rm blockchain/portfolio',
      'yarn build && yarn deploy',
      'crypto-wallet --balance',
      'starship config --tokyo-night'
    ]
    const randomCommand = commands[Math.floor(Math.random() * commands.length)]
    setTerminalOutput(prev => [...prev, `➜ portfolio main $ ${randomCommand}`, `✅ Command executed successfully!`])
  }

  return (
    <section id="terminal" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-pink-400">Interactive Terminal</h2>
        
        {/* Terminal Window */}
        <div className="bg-gray-900 rounded-lg shadow-2xl terminal-glow overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 text-center text-gray-400 text-sm font-medium">
              your-name@portfolio:~$ 
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-6 space-y-4 text-sm">
            {/* Welcome Message */}
            <div className="flex items-center space-x-2">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">welcome</span>
            </div>
            <div className="ml-4 text-gray-300">
              Welcome to my portfolio! I&apos;m a passionate developer and blockchain enthusiast.
            </div>
            
            {/* Git Status */}
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">portfolio</span>
              <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">main</span>
              <span className="text-white">git status</span>
            </div>
            <div className="ml-4 space-y-1">
              <div className="text-green-400">On branch main</div>
              <div className="text-green-400">Your branch is up to date with &apos;origin/main&apos;.</div>
              <div className="text-gray-300">nothing to commit, working tree clean ✨</div>
            </div>
            
            {/* Skills Command */}
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">portfolio</span>
              <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">main</span>
              <span className="text-white">cat skills.json</span>
            </div>
            <div className="ml-4 bg-gray-800 p-4 rounded border-l-4 border-purple-500">
              <pre className="text-gray-300">
{`{
  "languages": ["TypeScript", "Python", "Rust", "Solidity"],
  "frameworks": ["React", "Next.js", "Node.js"],
  "blockchain": ["Ethereum", "Web3", "DeFi", "Smart Contracts"],
  "tools": ["Docker", "AWS", "PostgreSQL"]
}`}
              </pre>
            </div>
            
            {/* Crypto Portfolio */}
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">portfolio</span>
              <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">main</span>
              <span className="text-white">crypto-portfolio --status</span>
            </div>
            <div className="ml-4 space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-orange-400">₿ BTC</span>
                <span className="text-green-400">↗ +12.5%</span>
                <span className="text-gray-300">Portfolio: 40%</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-blue-400">Ξ ETH</span>
                <span className="text-green-400">↗ +8.2%</span>
                <span className="text-gray-300">Portfolio: 35%</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-purple-400">⬟ SOL</span>
                <span className="text-red-400">↘ -2.1%</span>
                <span className="text-gray-300">Portfolio: 15%</span>
              </div>
              <div className="text-gray-400 text-xs mt-2">DeFi protocols active: Uniswap, Aave, Compound</div>
            </div>
            
            {/* Contact */}
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">portfolio</span>
              <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">main</span>
              <span className="text-white typing-animation">contact --social</span>
            </div>
            <div className="ml-4 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">GitHub:</span>
                <a href="https://github.com/yourusername" className="text-blue-400 hover:underline">github.com/yourusername</a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Blog:</span>
                <a href="https://yourblog.com" className="text-blue-400 hover:underline">yourblog.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Email:</span>
                <a href="mailto:your.email@example.com" className="text-blue-400 hover:underline">your.email@example.com</a>
              </div>
            </div>

            {/* Dynamic Output */}
            {terminalOutput.map((line, index) => (
              <div key={index} className="text-gray-300">{line}</div>
            ))}
            
            {/* Cursor */}
            <div className="flex items-center space-x-2 mt-6">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">portfolio</span>
              <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">main</span>
              <span className="text-white">_</span>
              <span className="animate-ping w-2 h-5 bg-purple-400 inline-block"></span>
            </div>
          </div>
        </div>
        
        {/* Terminal Actions */}
        <div className="flex justify-center mt-8 space-x-4">
          <button 
            onClick={clearTerminal}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors"
          >
            Clear Terminal
          </button>
          <button 
            onClick={runRandomCommand}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors"
          >
            Run Random Command
          </button>
        </div>
      </div>
    </section>
  )
}
