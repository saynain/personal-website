'use client'

export default function Terminal() {
  return (
    <section id="terminal" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-pink-400">
          Terminal Setup
        </h2>
        
        {/* Terminal Window */}
        <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-3 flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 text-center text-gray-400 text-sm font-medium">
              sindre@MBP-M4 — ghostty — 120×40
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm bg-gray-900">
            {/* Command */}
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">neofetch</span>
            </div>
            
            {/* Neofetch output */}
            <div className="flex space-x-8">
              {/* Apple Logo ASCII */}
              <div className="text-green-400 leading-tight whitespace-pre font-mono text-xs">
{`                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.`}
              </div>
              
              {/* System Info */}
              <div className="flex-1 space-y-1 text-xs">
                <div className="flex">
                  <span className="text-green-400 w-32"></span>
                  <span className="text-white font-bold">saynain@portfolio</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32"></span>
                  <span className="text-gray-400">-----------------</span>
                </div>
                
                <div className="flex">
                  <span className="text-green-400 w-32">OS:</span>
                  <span className="text-white">Portfolio 2.0.0 (Next.js)</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">Host:</span>
                  <span className="text-white">MacBook Pro M4 (2024)</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">Kernel:</span>
                  <span className="text-white">TypeScript 5.0</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">Uptime:</span>
                  <span className="text-white">Always online</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">Packages:</span>
                  <span className="text-white">49 (brew), 200+ (npm)</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">Shell:</span>
                  <span className="text-white">zsh 5.9 (oh-my-zsh)</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">Resolution:</span>
                  <span className="text-white">3440x1440, 1512x982</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">DE:</span>
                  <span className="text-white">VS Code + Cursor</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">WM:</span>
                  <span className="text-white">Arc Browser</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">WM Theme:</span>
                  <span className="text-white">Tokyo Night Storm</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">Terminal:</span>
                  <span className="text-white">ghostty</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">CPU:</span>
                  <span className="text-white">Apple M4 Pro</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">GPU:</span>
                  <span className="text-white">Apple M4 Pro</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">Memory:</span>
                  <span className="text-white">48GB / 48GB (Unified)</span>
                </div>
                <div className="flex mt-2">
                  <span className="text-green-400 w-32">Location:</span>
                  <span className="text-white">Norway 🇳🇴</span>
                </div>
                <div className="flex">
                  <span className="text-green-400 w-32">Fuel:</span>
                  <span className="text-white">Coffee + Dark Chocolate</span>
                </div>

                {/* Color blocks */}
                <div className="mt-4 space-y-1">
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 bg-black"></div>
                    <div className="w-4 h-4 bg-red-500"></div>
                    <div className="w-4 h-4 bg-green-500"></div>
                    <div className="w-4 h-4 bg-yellow-500"></div>
                    <div className="w-4 h-4 bg-blue-500"></div>
                    <div className="w-4 h-4 bg-purple-500"></div>
                    <div className="w-4 h-4 bg-cyan-500"></div>
                    <div className="w-4 h-4 bg-white"></div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 bg-gray-600"></div>
                    <div className="w-4 h-4 bg-red-400"></div>
                    <div className="w-4 h-4 bg-green-400"></div>
                    <div className="w-4 h-4 bg-yellow-400"></div>
                    <div className="w-4 h-4 bg-blue-400"></div>
                    <div className="w-4 h-4 bg-purple-400"></div>
                    <div className="w-4 h-4 bg-cyan-400"></div>
                    <div className="w-4 h-4 bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next prompt */}
            <div className="flex items-center space-x-2 mt-6">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">~</span>
              <span className="bg-green-400 w-2 h-4 inline-block animate-pulse"></span>
            </div>
          </div>
        </div>
        
        {/* Terminal info */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>Current setup</span>
            <span>•</span>
            <span>Always evolving</span>
          </div>
        </div>
      </div>
    </section>
  )
}
