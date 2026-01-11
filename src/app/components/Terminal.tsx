'use client'

import { useState, useRef, useEffect, KeyboardEvent, ReactNode } from 'react'
import { useTheme } from 'next-themes'

// Catppuccin Mocha (dark) color scheme
const catppuccinMocha = {
  base: '#1e1e2e',
  mantle: '#181825',
  crust: '#11111b',
  surface0: '#313244',
  surface1: '#45475a',
  surface2: '#585b70',
  text: '#cdd6f4',
  subtext0: '#a6adc8',
  subtext1: '#bac2de',
  blue: '#89b4fa',
  lavender: '#b4befe',
  sapphire: '#74c7ec',
  sky: '#89dceb',
  teal: '#94e2d5',
  green: '#a6e3a1',
  yellow: '#f9e2af',
  peach: '#fab387',
  maroon: '#eba0ac',
  red: '#f38ba8',
  mauve: '#cba6f7',
  pink: '#f5c2e7',
  flamingo: '#f2cdcd',
  rosewater: '#f5e0dc',
}

// Catppuccin Latte (light) color scheme
const catppuccinLatte = {
  base: '#eff1f5',
  mantle: '#e6e9ef',
  crust: '#dce0e8',
  surface0: '#ccd0da',
  surface1: '#bcc0cc',
  surface2: '#acb0be',
  text: '#4c4f69',
  subtext0: '#6c6f85',
  subtext1: '#5c5f77',
  blue: '#1e66f5',
  lavender: '#7287fd',
  sapphire: '#209fb5',
  sky: '#04a5e5',
  teal: '#179299',
  green: '#40a02b',
  yellow: '#df8e1d',
  peach: '#fe640b',
  maroon: '#e64553',
  red: '#d20f39',
  mauve: '#8839ef',
  pink: '#ea76cb',
  flamingo: '#dd7878',
  rosewater: '#dc8a78',
}

// ASCII Art for neofetch
const appleAscii = `                    'c.
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
       .cooc,.    .,coo:.`

const ghostAscii = `
    .-"""-.
   /        \\
  |  O    O  |
  |    __    |
   \\  \\__/  /
    '-.  .-'
       ||
      /||\\
     / || \\
    /  ||  \\
   '---''---'`

interface HistoryItem {
  type: 'input' | 'output'
  content: string | ReactNode
}

// Command definitions factory that takes colors
const createCommands = (colors: typeof catppuccinMocha, isLight: boolean): Record<string, () => string | ReactNode> => ({
  help: () => `
Available commands:
  help        Show this help message
  about       Learn about me
  skills      View my technical skills
  projects    See my projects
  contact     Get my contact information
  neofetch    Display system info
  whoami      Who am I?
  ls          List portfolio sections
  cat         View file contents (try: cat readme.md)
  clear       Clear the terminal
  theme       Show terminal theme info

Type any command and press Enter to execute.
`,
  about: () => `
Hi! I'm Saynain - a developer passionate about building
elegant solutions to complex problems.

I love working with modern web technologies and creating
user experiences that are both beautiful and functional.

When I'm not coding, you'll find me exploring new tech,
contributing to open source, or enjoying a good cup of coffee.
`,
  skills: () => `
Technical Skills
================

Languages:     TypeScript, JavaScript, Python, Go, Rust
Frontend:      React, Next.js, Vue, Tailwind CSS
Backend:       Node.js, Express, FastAPI, PostgreSQL
DevOps:        Docker, Kubernetes, AWS, Vercel
Tools:         Git, Neovim, VS Code, Cursor

Currently exploring: AI/ML, WebAssembly, Zig
`,
  projects: () => `
Featured Projects
=================

[1] Personal Website (this!)
    Next.js 15 + TypeScript + Tailwind CSS
    Modern portfolio with Ghostty-inspired terminal

[2] Open Source Contributions
    Various contributions to tools I use daily

[3] Side Projects
    Building cool stuff in my free time

Run 'cat projects.md' for more details.
`,
  contact: () => `
Contact Information
===================

GitHub:    github.com/saynain
Email:     hello@saynain.dev
Location:  Norway

Feel free to reach out for collaborations,
opportunities, or just to say hi!
`,
  whoami: () => 'saynain',
  ls: () => `
drwxr-xr-x  about/
drwxr-xr-x  projects/
drwxr-xr-x  skills/
-rw-r--r--  readme.md
-rw-r--r--  contact.md
-rw-r--r--  projects.md
`,
  theme: () => `
Terminal Theme: Ghostty + Catppuccin ${isLight ? 'Latte' : 'Mocha'}
==========================================

Ghostty is a fast, feature-rich terminal emulator that
uses platform-native UI and GPU acceleration.

Catppuccin is a soothing pastel theme for the high-spirited!
This terminal uses the ${isLight ? 'Latte' : 'Mocha'} flavor - the ${isLight ? 'lightest' : 'darkest'} variant.

Learn more:
  Ghostty:    https://ghostty.org
  Catppuccin: https://catppuccin.com
`,
})

// Neofetch command with special rendering
const createNeofetchOutput = (colors: typeof catppuccinMocha): ReactNode => (
  <div className="flex gap-6 sm:gap-8">
    <pre className="text-xs leading-tight hidden sm:block" style={{ color: colors.green }}>
      {appleAscii}
    </pre>
    <pre className="text-xs leading-tight sm:hidden" style={{ color: colors.mauve }}>
      {ghostAscii}
    </pre>
    <div className="text-xs space-y-0.5">
      <div><span style={{ color: colors.teal }}>saynain</span>@<span style={{ color: colors.teal }}>portfolio</span></div>
      <div style={{ color: colors.surface2 }}>-----------------</div>
      <div><span style={{ color: colors.mauve }}>OS:</span> Portfolio 2.0.0 (Next.js 15)</div>
      <div><span style={{ color: colors.mauve }}>Host:</span> MacBook Pro M4 (2024)</div>
      <div><span style={{ color: colors.mauve }}>Kernel:</span> TypeScript 5.0</div>
      <div><span style={{ color: colors.mauve }}>Uptime:</span> Always online</div>
      <div><span style={{ color: colors.mauve }}>Packages:</span> 49 (brew), 200+ (npm)</div>
      <div><span style={{ color: colors.mauve }}>Shell:</span> zsh 5.9 (oh-my-zsh)</div>
      <div><span style={{ color: colors.mauve }}>Resolution:</span> 3440x1440, 1512x982</div>
      <div><span style={{ color: colors.mauve }}>DE:</span> VS Code + Cursor</div>
      <div><span style={{ color: colors.mauve }}>WM:</span> Arc Browser</div>
      <div><span style={{ color: colors.mauve }}>WM Theme:</span> Catppuccin</div>
      <div><span style={{ color: colors.mauve }}>Terminal:</span> ghostty</div>
      <div><span style={{ color: colors.mauve }}>CPU:</span> Apple M4 Pro</div>
      <div><span style={{ color: colors.mauve }}>GPU:</span> Apple M4 Pro</div>
      <div><span style={{ color: colors.mauve }}>Memory:</span> 48GB / 48GB (Unified)</div>
      <div className="mt-1"><span style={{ color: colors.mauve }}>Location:</span> Norway</div>
      <div><span style={{ color: colors.mauve }}>Fuel:</span> Coffee + Dark Chocolate</div>
      <div className="flex gap-1 mt-2">
        {[colors.rosewater, colors.flamingo, colors.pink, colors.mauve, colors.red, colors.maroon, colors.peach, colors.yellow].map((c, i) => (
          <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm" style={{ backgroundColor: c }} />
        ))}
      </div>
      <div className="flex gap-1">
        {[colors.green, colors.teal, colors.sky, colors.sapphire, colors.blue, colors.lavender, colors.text, colors.surface2].map((c, i) => (
          <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  </div>
)

// Cat command with file contents
const catFiles: Record<string, string> = {
  'readme.md': `
# Welcome to my Portfolio

This is an interactive terminal built with React and
styled after Ghostty with Catppuccin theme.

## Quick Start

Type 'help' to see available commands.

## Features

- Interactive command input
- Command history (use arrow keys)
- Catppuccin color scheme (Latte/Mocha)
- Automatic light/dark mode support
- Custom portfolio commands

Enjoy exploring!
`,
  'contact.md': `
Contact Information
===================

GitHub:    github.com/saynain
Email:     hello@saynain.dev
Location:  Norway

Feel free to reach out for collaborations,
opportunities, or just to say hi!
`,
  'projects.md': `
# Projects

## Personal Website
A modern portfolio built with Next.js 15, featuring
this interactive Ghostty-styled terminal.

Tech: TypeScript, React, Next.js, Tailwind CSS

## Coming Soon
More projects in the works...
`,
}

// Custom scrollbar styles generator
const createScrollbarStyles = (colors: typeof catppuccinMocha) => `
  .terminal-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .terminal-scrollbar::-webkit-scrollbar-track {
    background: ${colors.mantle};
    border-radius: 4px;
  }
  .terminal-scrollbar::-webkit-scrollbar-thumb {
    background: ${colors.surface1};
    border-radius: 4px;
  }
  .terminal-scrollbar::-webkit-scrollbar-thumb:hover {
    background: ${colors.surface2};
  }
  .terminal-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: ${colors.surface1} ${colors.mantle};
  }
`

export default function Terminal() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Determine colors based on theme
  const isLight = mounted && resolvedTheme === 'light'
  const colors = isLight ? catppuccinLatte : catppuccinMocha
  const commands = createCommands(colors, isLight)

  // Track if initial neofetch has been shown
  const initializedRef = useRef(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize with neofetch only once after mount
  useEffect(() => {
    if (mounted && !initializedRef.current) {
      initializedRef.current = true
      const currentColors = resolvedTheme === 'light' ? catppuccinLatte : catppuccinMocha
      setHistory([{ type: 'output', content: createNeofetchOutput(currentColors) }])
    }
  }, [mounted, resolvedTheme])

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus input on click
  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const args = trimmedCmd.split(' ')
    const command = args[0]

    // Add input to history
    const newHistory: HistoryItem[] = [
      ...history,
      { type: 'input', content: cmd }
    ]

    // Execute command
    if (command === '') {
      setHistory(newHistory)
    } else if (command === 'clear') {
      setHistory([])
    } else if (command === 'neofetch') {
      setHistory([...newHistory, { type: 'output', content: createNeofetchOutput(colors) }])
    } else if (command === 'cat') {
      const filename = args[1]
      if (!filename) {
        setHistory([...newHistory, { type: 'output', content: 'Usage: cat <filename>' }])
      } else if (catFiles[filename]) {
        setHistory([...newHistory, { type: 'output', content: catFiles[filename] }])
      } else {
        setHistory([...newHistory, { type: 'output', content: `cat: ${filename}: No such file or directory` }])
      }
    } else if (commands[command]) {
      setHistory([...newHistory, { type: 'output', content: commands[command]() }])
    } else {
      setHistory([...newHistory, {
        type: 'output',
        content: `zsh: command not found: ${command}\nType 'help' to see available commands.`
      }])
    }

    // Add to command history for arrow key navigation
    if (cmd.trim()) {
      setCommandHistory(prev => [...prev, cmd])
    }
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setHistory([])
    }
  }

  // Prevent hydration mismatch by showing a placeholder until mounted
  if (!mounted) {
    return (
      <section id="terminal" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16 text-purple-500">
            Interactive Terminal
          </h2>
          <div className="rounded-xl shadow-2xl overflow-hidden border h-[456px] sm:h-[556px] bg-gray-900 dark:bg-gray-900 border-gray-700 animate-pulse" />
        </div>
      </section>
    )
  }

  return (
    <section id="terminal" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      <style dangerouslySetInnerHTML={{ __html: createScrollbarStyles(colors) }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16" style={{ color: colors.mauve }}>
          Interactive Terminal
        </h2>

        {/* Terminal Window */}
        <div
          className="rounded-xl shadow-2xl overflow-hidden border cursor-text transition-colors duration-300"
          style={{
            backgroundColor: colors.base,
            borderColor: colors.surface0
          }}
          onClick={handleTerminalClick}
        >
          {/* Terminal Header - Ghostty style */}
          <div
            className="px-4 py-2.5 flex items-center transition-colors duration-300"
            style={{ backgroundColor: colors.mantle }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full transition-colors" style={{ backgroundColor: colors.red }} />
              <div className="w-3 h-3 rounded-full transition-colors" style={{ backgroundColor: colors.yellow }} />
              <div className="w-3 h-3 rounded-full transition-colors" style={{ backgroundColor: colors.green }} />
            </div>
            <div className="flex-1 text-center text-xs sm:text-sm font-medium transition-colors duration-300" style={{ color: colors.subtext0 }}>
              saynain@portfolio ~ ghostty
            </div>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="p-4 sm:p-6 font-mono text-xs sm:text-sm h-[400px] sm:h-[500px] overflow-y-auto terminal-scrollbar transition-colors duration-300"
            style={{ backgroundColor: colors.base }}
          >
            {/* History */}
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                {item.type === 'input' ? (
                  <div className="flex items-center gap-2">
                    <span style={{ color: colors.teal }}>~</span>
                    <span style={{ color: colors.blue }}>$</span>
                    <span style={{ color: colors.text }}>{item.content}</span>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap" style={{ color: colors.text }}>
                    {item.content}
                  </div>
                )}
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center gap-2">
              <span style={{ color: colors.teal }}>~</span>
              <span style={{ color: colors.blue }}>$</span>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent outline-none caret-transparent"
                  style={{ color: colors.text }}
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
                {/* Custom cursor */}
                <span
                  className="absolute top-0 h-full w-2 animate-pulse"
                  style={{
                    left: `${input.length * 0.6}em`,
                    backgroundColor: colors.rosewater
                  }}
                />
              </div>
            </div>
          </div>

          {/* Terminal Footer */}
          <div
            className="px-4 py-2 flex items-center justify-between text-xs border-t transition-colors duration-300"
            style={{
              backgroundColor: colors.mantle,
              borderColor: colors.surface0,
              color: colors.subtext0
            }}
          >
            <span>Type &apos;help&apos; for commands</span>
            <span className="hidden sm:inline">Ghostty + Catppuccin {isLight ? 'Latte' : 'Mocha'}</span>
          </div>
        </div>

        {/* Terminal info */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 text-sm transition-colors duration-300" style={{ color: colors.subtext0 }}>
            <div className="w-2 h-2 rounded-full transition-colors duration-300" style={{ backgroundColor: colors.green }} />
            <span>Interactive terminal</span>
            <span>•</span>
            <span>Powered by React</span>
          </div>
        </div>
      </div>
    </section>
  )
}
