import { createContext, useContext, useState, useCallback, useRef } from 'react'

const TerminalContextCtx = createContext(null)

const MAX_HISTORY = 100

let idCounter = 0
function nextId() {
  return `out_${++idCounter}_${Date.now()}`
}

export function TerminalProvider({ children }) {
  const [phase, setPhase] = useState('booting')
  const [output, setOutput] = useState([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0)
  const [commandCount, setCommandCount] = useState(0)
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('terminal-settings')
      const parsed = saved ? JSON.parse(saved) : { sound: true, theme: 'dark' }
      document.documentElement.classList.toggle('light', parsed.theme === 'light')
      return parsed
    } catch {
      return { sound: true, theme: 'dark' }
    }
  })

  const commandMapRef = useRef(new Map())

  const registerCommands = useCallback((commands) => {
    for (const [name, config] of Object.entries(commands)) {
      commandMapRef.current.set(name, config)
    }
  }, [])

  const addOutput = useCallback((type, content, extra) => {
    const entry = { id: nextId(), type, content, timestamp: Date.now(), ...extra }
    setOutput(prev => [...prev, entry])
  }, [])

  const clearOutput = useCallback(() => {
    setOutput([])
  }, [])

  const updateSettings = useCallback((patch) => {
    setSettings(prev => {
      const next = { ...prev, ...patch }
      try { localStorage.setItem('terminal-settings', JSON.stringify(next)) } catch {}
      if (patch.theme !== undefined) {
        document.documentElement.classList.toggle('light', next.theme === 'light')
      }
      return next
    })
  }, [])

  const executeCommand = useCallback((cmdInput) => {
    const trimmed = (cmdInput || input).trim()
    if (!trimmed) return

    const entry = { id: nextId(), type: 'input', content: trimmed, timestamp: Date.now() }

    setHistory(prev => {
      const next = [...prev, trimmed]
      return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next
    })
    setHistoryIndex(-1)
    setCommandCount(prev => prev + 1)

    const parts = trimmed.split(/\s+/)
    const cmdName = parts[0]
    const args = parts.slice(1)
    const cmd = commandMapRef.current.get(cmdName)
    const handlerCtx = {
      addOutput,
      clearOutput,
      commandMap: commandMapRef,
      updateSettings,
      settings,
      history,
    }

    if (cmd) {
      setOutput(prev => [...prev, entry])
      cmd.handler({ ...handlerCtx, args })
    } else {
      setOutput(prev => [...prev, entry])
      addOutput('error', `command not found: ${trimmed}`)
      addOutput('text', `Type 'help' for a list of available commands.`)
    }

    setInput('')
    setSuggestions([])
  }, [input, addOutput, clearOutput, updateSettings, settings, history])

  const navigateHistory = useCallback((direction) => {
    if (history.length === 0) return

    setHistoryIndex(prev => {
      let next
      if (direction === 'up') {
        if (prev === -1) {
          next = history.length - 1
        } else if (prev > 0) {
          next = prev - 1
        } else {
          next = 0
        }
      } else {
        if (prev === -1 || prev >= history.length - 1) {
          next = -1
        } else {
          next = prev + 1
        }
      }
      setInput(next === -1 ? '' : history[next])
      return next
    })
  }, [history])

  const value = {
    phase, setPhase,
    output, addOutput, clearOutput,
    input, setInput,
    history, historyIndex,
    suggestions, setSuggestions,
    selectedSuggestionIndex, setSelectedSuggestionIndex,
    commandCount,
    settings, updateSettings,
    executeCommand, navigateHistory,
    registerCommands,
    commandMap: commandMapRef,
  }

  return (
    <TerminalContextCtx.Provider value={value}>
      {children}
    </TerminalContextCtx.Provider>
  )
}

export function useTerminalContext() {
  const ctx = useContext(TerminalContextCtx)
  if (!ctx) throw new Error('useTerminalContext must be used within TerminalProvider')
  return ctx
}
