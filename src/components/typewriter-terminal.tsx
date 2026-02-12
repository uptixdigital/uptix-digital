"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TerminalLine {
  text: string
  color?: string
  delay?: number
  typeSpeed?: number
}

interface LanguageSession {
  name: string
  icon: string
  lines: TerminalLine[]
}

const languageSessions: LanguageSession[] = [
  {
    name: "TypeScript",
    icon: "⌘",
    lines: [
      { text: "$ npm create uptix-project@latest", color: "text-green-400", delay: 0, typeSpeed: 30 },
      { text: "", color: "", delay: 200 },
      { text: "? Project name: ", color: "text-slate-400", delay: 0, typeSpeed: 15 },
      { text: "my-awesome-app", color: "text-white", delay: 0, typeSpeed: 30 },
      { text: "", color: "", delay: 300 },
      { text: "? Select framework: ", color: "text-slate-400", delay: 0, typeSpeed: 15 },
      { text: "Next.js 15", color: "text-yellow-400", delay: 0, typeSpeed: 20 },
      { text: "", color: "", delay: 200 },
      { text: "? Add TypeScript? ", color: "text-slate-400", delay: 0, typeSpeed: 15 },
      { text: "Yes", color: "text-green-400", delay: 0, typeSpeed: 20 },
      { text: "", color: "", delay: 200 },
      { text: "? Add Tailwind CSS? ", color: "text-slate-400", delay: 0, typeSpeed: 15 },
      { text: "Yes", color: "text-green-400", delay: 0, typeSpeed: 20 },
      { text: "", color: "", delay: 500 },
      { text: "✓ Project initialized successfully!", color: "text-green-400", delay: 0, typeSpeed: 25 },
      { text: "", color: "", delay: 300 },
      { text: "→ cd my-awesome-app", color: "text-slate-500", delay: 0, typeSpeed: 20 },
      { text: "", color: "", delay: 200 },
      { text: "→ npm run dev", color: "text-slate-500", delay: 0, typeSpeed: 20 },
      { text: "", color: "", delay: 800 },
      { text: "ready - started server on 0.0.0.0:3000", color: "text-blue-400", delay: 0, typeSpeed: 20 },
    ]
  },
  {
    name: "Python",
    icon: "🐍",
    lines: [
      { text: "$ python3 -m venv uptix-env", color: "text-green-400", delay: 0, typeSpeed: 30 },
      { text: "", color: "", delay: 300 },
      { text: "$ source uptix-env/bin/activate", color: "text-green-400", delay: 0, typeSpeed: 30 },
      { text: "(uptix-env) $ pip install fastapi uvicorn", color: "text-blue-400", delay: 0, typeSpeed: 25 },
      { text: "", color: "", delay: 500 },
      { text: "Collecting fastapi", color: "text-slate-400", delay: 0, typeSpeed: 20 },
      { text: "Collecting uvicorn", color: "text-slate-400", delay: 100, typeSpeed: 20 },
      { text: "Installing collected packages...", color: "text-slate-400", delay: 200, typeSpeed: 20 },
      { text: "Successfully installed", color: "text-green-400", delay: 300, typeSpeed: 25 },
      { text: "", color: "", delay: 300 },
      { text: "(uptix-env) $ python main.py", color: "text-green-400", delay: 0, typeSpeed: 30 },
      { text: "", color: "", delay: 400 },
      { text: "INFO:     Uvicorn running on http://0.0.0.0:8000", color: "text-purple-400", delay: 0, typeSpeed: 20 },
      { text: "INFO:     Application startup complete.", color: "text-blue-400", delay: 100, typeSpeed: 20 },
    ]
  },
  {
    name: "React Native",
    icon: "⚛️",
    lines: [
      { text: "$ npx react-native init UptixMobile", color: "text-green-400", delay: 0, typeSpeed: 30 },
      { text: "", color: "", delay: 400 },
      { text: "✔ Downloading template", color: "text-blue-400", delay: 0, typeSpeed: 20 },
      { text: "✔ Copying template", color: "text-blue-400", delay: 150, typeSpeed: 20 },
      { text: "✔ Processing template", color: "text-blue-400", delay: 150, typeSpeed: 20 },
      { text: "✔ Installing dependencies", color: "text-blue-400", delay: 200, typeSpeed: 20 },
      { text: "", color: "", delay: 300 },
      { text: "cd UptixMobile", color: "text-slate-500", delay: 0, typeSpeed: 20 },
      { text: "", color: "", delay: 200 },
      { text: "npx react-native run-ios", color: "text-green-400", delay: 0, typeSpeed: 25 },
      { text: "", color: "", delay: 600 },
      { text: "info Installing build dependencies...", color: "text-slate-400", delay: 0, typeSpeed: 20 },
      { text: "success Build successful!", color: "text-green-400", delay: 400, typeSpeed: 25 },
      { text: "", color: "", delay: 200 },
      { text: "✓ App launched on iPhone 15 Pro", color: "text-purple-400", delay: 0, typeSpeed: 20 },
    ]
  },
  {
    name: "Go",
    icon: "🚀",
    lines: [
      { text: "$ go mod init github.com/uptix/api", color: "text-cyan-400", delay: 0, typeSpeed: 30 },
      { text: "go: creating new go.mod", color: "text-slate-400", delay: 200, typeSpeed: 20 },
      { text: "", color: "", delay: 200 },
      { text: "$ go get github.com/gin-gonic/gin", color: "text-cyan-400", delay: 0, typeSpeed: 30 },
      { text: "", color: "", delay: 400 },
      { text: "go: downloading github.com/gin-gonic/gin", color: "text-slate-400", delay: 0, typeSpeed: 20 },
      { text: "go: downloading dependencies...", color: "text-slate-400", delay: 150, typeSpeed: 20 },
      { text: "", color: "", delay: 300 },
      { text: "$ go build -o api-server", color: "text-cyan-400", delay: 0, typeSpeed: 30 },
      { text: "", color: "", delay: 500 },
      { text: "$ ./api-server", color: "text-green-400", delay: 0, typeSpeed: 25 },
      { text: "", color: "", delay: 300 },
      { text: "[GIN] 2024/01/15 - 10:30:00 | 200 |     1.2ms |       ::1 | GET     /api/health", color: "text-green-400", delay: 0, typeSpeed: 15 },
      { text: "[GIN] Listening on :8080", color: "text-blue-400", delay: 100, typeSpeed: 20 },
    ]
  }
]

export function TypewriterTerminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0)
  const [showFullTerminal, setShowFullTerminal] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)

  const currentSession = languageSessions[currentSessionIndex]
  const terminalLines = currentSession.lines

  // Show full terminal immediately on mount
  useEffect(() => {
    setShowFullTerminal(true)
    // Small delay before starting to type
    const timer = setTimeout(() => {
      setIsTyping(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isTyping || !showFullTerminal) return

    if (currentLineIndex >= terminalLines.length) {
      // Session complete, wait then switch to next
      setSessionComplete(true)
      const timer = setTimeout(() => {
        setCurrentSessionIndex((prev) => (prev + 1) % languageSessions.length)
        setCurrentLineIndex(0)
        setCurrentCharIndex(0)
        setDisplayedLines([])
        setSessionComplete(false)
      }, 3000)
      return () => clearTimeout(timer)
    }

    const currentLine = terminalLines[currentLineIndex]
    
    // Handle empty lines (just delays)
    if (!currentLine.text) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, ""])
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }, currentLine.delay || 100)
      return () => clearTimeout(timer)
    }

    // Handle typing
    if (currentCharIndex < currentLine.text.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev]
          if (newLines.length <= currentLineIndex) {
            newLines.push(currentLine.text.substring(0, currentCharIndex + 1))
          } else {
            newLines[currentLineIndex] = currentLine.text.substring(0, currentCharIndex + 1)
          }
          return newLines
        })
        setCurrentCharIndex(prev => prev + 1)
      }, currentLine.typeSpeed || 20)
      return () => clearTimeout(timer)
    } else {
      // Line complete, move to next
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }, currentLine.delay || 100)
      return () => clearTimeout(timer)
    }
  }, [currentLineIndex, currentCharIndex, isTyping, showFullTerminal, currentSessionIndex, terminalLines])

  return (
    <div className="font-mono text-sm h-full flex flex-col">
      {/* Session Header */}
      <motion.div 
        className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-2xl">{currentSession.icon}</span>
        <span className="text-white font-semibold">{currentSession.name}</span>
        <span className="text-slate-500 text-xs ml-auto">
          Session {currentSessionIndex + 1}/{languageSessions.length}
        </span>
      </motion.div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-hidden">
        {showFullTerminal && terminalLines.map((line, index) => {
          if (index > currentLineIndex) {
            // Show placeholder for future lines
            return (
              <div key={index} className="h-5" />
            )
          }
          
          const isCurrentLine = index === currentLineIndex && !sessionComplete
          const displayText = displayedLines[index] || ""
          
          return (
            <motion.div 
              key={`${currentSessionIndex}-${index}`} 
              className={line.color || "text-slate-400"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              {line.text.startsWith("?") && (
                <span className="text-blue-400">? </span>
              )}
              {line.text.startsWith("→") && (
                <span className="text-blue-400">→ </span>
              )}
              {displayText.replace(/^[?→]\s*/, "")}
              {isCurrentLine && isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-blue-400 ml-0.5 align-middle"
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Status Bar */}
      <motion.div 
        className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-slate-500">
          {sessionComplete ? (
            <span className="text-green-400">✓ Complete</span>
          ) : (
            <span className="text-blue-400">● Typing...</span>
          )}
        </span>
        <div className="flex gap-2">
          {languageSessions.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentSessionIndex ? "bg-blue-400" : "bg-slate-600"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
