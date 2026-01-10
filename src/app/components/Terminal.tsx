'use client'

import { useState, useRef, useEffect, KeyboardEvent, ReactNode } from 'react'

// Ghostty-inspired Tokyo Night color scheme
const colors = {
  bg: '#1a1b26',
  bgDark: '#16161e',
  bgHighlight: '#292e42',
  fg: '#c0caf5',
  fgDark: '#565f89',
  blue: '#7aa2f7',
  cyan: '#7dcfff',
  green: '#9ece6a',
  magenta: '#bb9af7',
  red: '#f7768e',
  yellow: '#e0af68',
  orange: '#ff9e64',
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

// Command definitions
const commands: Record<string, () => string | ReactNode> = {
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
Terminal Theme: Ghostty + Tokyo Night Storm
============================================

Ghostty is a fast, feature-rich terminal emulator that
uses platform-native UI and GPU acceleration.

This terminal is inspired by Ghostty's aesthetic and
implements the Tokyo Night Storm color scheme.

Learn more: https://ghostty.org
`,
}

// Neofetch command with special rendering
const neofetchOutput = (): ReactNode => (
  <div className="flex gap-6 sm:gap-8">
    <pre className="text-xs leading-tight hidden sm:block" style={{ color: colors.green }}>
      {appleAscii}
    </pre>
    <pre className="text-xs leading-tight sm:hidden" style={{ color: colors.magenta }}>
      {ghostAscii}
    </pre>
    <div className="text-xs space-y-0.5">
      <div><span style={{ color: colors.green }}>saynain</span>@<span style={{ color: colors.green }}>portfolio</span></div>
      <div style={{ color: colors.fgDark }}>-----------------</div>
      <div><span style={{ color: colors.blue }}>OS:</span> Portfolio 2.0.0 (Next.js 15)</div>
      <div><span style={{ color: colors.blue }}>Host:</span> MacBook Pro M4 (2024)</div>
      <div><span style={{ color: colors.blue }}>Kernel:</span> TypeScript 5.0</div>
      <div><span style={{ color: colors.blue }}>Uptime:</span> Always online</div>
      <div><span style={{ color: colors.blue }}>Packages:</span> 49 (brew), 200+ (npm)</div>
      <div><span style={{ color: colors.blue }}>Shell:</span> zsh 5.9 (oh-my-zsh)</div>
      <div><span style={{ color: colors.blue }}>Resolution:</span> 3440x1440, 1512x982</div>
      <div><span style={{ color: colors.blue }}>DE:</span> VS Code + Cursor</div>
      <div><span style={{ color: colors.blue }}>WM:</span> Arc Browser</div>
      <div><span style={{ color: colors.blue }}>WM Theme:</span> Tokyo Night Storm</div>
      <div><span style={{ color: colors.blue }}>Terminal:</span> ghostty</div>
      <div><span style={{ color: colors.blue }}>CPU:</span> Apple M4 Pro</div>
      <div><span style={{ color: colors.blue }}>GPU:</span> Apple M4 Pro</div>
      <div><span style={{ color: colors.blue }}>Memory:</span> 48GB / 48GB (Unified)</div>
      <div className="mt-1"><span style={{ color: colors.blue }}>Location:</span> Norway</div>
      <div><span style={{ color: colors.blue }}>Fuel:</span> Coffee + Dark Chocolate</div>
      <div className="flex gap-1 mt-2">
        {['#1a1b26', '#f7768e', '#9ece6a', '#e0af68', '#7aa2f7', '#bb9af7', '#7dcfff', '#c0caf5'].map((c, i) => (
          <div key={i} className="w-3 h-3 sm:w-4 sm:h-4" style={{ backgroundColor: c }} />
        ))}
      </div>
      <div className="flex gap-1">
        {['#414868', '#ff9e64', '#73daca', '#ff9e64', '#2ac3de', '#c0caf5', '#89ddff', '#565f89'].map((c, i) => (
          <div key={i} className="w-3 h-3 sm:w-4 sm:h-4" style={{ backgroundColor: c }} />
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
styled after Ghostty - my favorite terminal emulator.

## Quick Start

Type 'help' to see available commands.

## Features

- Interactive command input
- Command history (use arrow keys)
- Ghostty-inspired Tokyo Night theme
- Custom portfolio commands

Enjoy exploring!
`,
  'contact.md': commands.contact() as string,
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

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', content: neofetchOutput() }
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

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
      setHistory([...newHistory, { type: 'output', content: neofetchOutput() }])
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

  return (
    <section id="terminal" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-16" style={{ color: colors.magenta }}>
          Interactive Terminal
        </h2>

        {/* Terminal Window */}
        <div
          className="rounded-xl shadow-2xl overflow-hidden border cursor-text"
          style={{
            backgroundColor: colors.bg,
            borderColor: colors.bgHighlight
          }}
          onClick={handleTerminalClick}
        >
          {/* Terminal Header - Ghostty style */}
          <div
            className="px-4 py-2.5 flex items-center"
            style={{ backgroundColor: colors.bgDark }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors" />
            </div>
            <div className="flex-1 text-center text-xs sm:text-sm font-medium" style={{ color: colors.fgDark }}>
              saynain@portfolio ~ ghostty
            </div>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="p-4 sm:p-6 font-mono text-xs sm:text-sm h-[400px] sm:h-[500px] overflow-y-auto"
            style={{ backgroundColor: colors.bg }}
          >
            {/* History */}
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                {item.type === 'input' ? (
                  <div className="flex items-center gap-2">
                    <span style={{ color: colors.green }}>~</span>
                    <span style={{ color: colors.blue }}>$</span>
                    <span style={{ color: colors.fg }}>{item.content}</span>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap" style={{ color: colors.fg }}>
                    {item.content}
                  </div>
                )}
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center gap-2">
              <span style={{ color: colors.green }}>~</span>
              <span style={{ color: colors.blue }}>$</span>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent outline-none caret-transparent"
                  style={{ color: colors.fg }}
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
                {/* Custom cursor */}
                <span
                  className="absolute top-0 h-full w-2 animate-pulse"
                  style={{
                    left: `${input.length * 0.6}em`,
                    backgroundColor: colors.green
                  }}
                />
              </div>
            </div>
          </div>

          {/* Terminal Footer */}
          <div
            className="px-4 py-2 flex items-center justify-between text-xs border-t"
            style={{
              backgroundColor: colors.bgDark,
              borderColor: colors.bgHighlight,
              color: colors.fgDark
            }}
          >
            <span>Type &apos;help&apos; for commands</span>
            <span className="hidden sm:inline">Ghostty + Tokyo Night</span>
          </div>
        </div>

        {/* Terminal info */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 text-sm" style={{ color: colors.fgDark }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.green }} />
            <span>Interactive terminal</span>
            <span>•</span>
            <span>Powered by React</span>
          </div>
        </div>
      </div>
    </section>
  )
}
