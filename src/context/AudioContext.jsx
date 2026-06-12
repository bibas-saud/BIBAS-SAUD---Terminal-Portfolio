import { createContext, useContext, useCallback, useRef } from 'react'
import { useTerminalContext } from './TerminalContext'

const AudioContextCtx = createContext(null)

export function AudioProvider({ children }) {
  const { settings } = useTerminalContext()
  const ctxRef = useRef(null)
  const initializedRef = useRef(false)

  const initAudio = useCallback(() => {
    if (initializedRef.current) return
    initializedRef.current = true
    ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
  }, [])

  const playTone = useCallback((freq, duration, type = 'sine', gain = 0.08) => {
    if (!settings.sound || !ctxRef.current) return
    try {
      const osc = ctxRef.current.createOscillator()
      const g = ctxRef.current.createGain()
      const now = ctxRef.current.currentTime
      osc.type = type
      osc.frequency.value = freq
      g.gain.setValueAtTime(gain, now)
      g.gain.exponentialRampToValueAtTime(0.001, now + duration)
      osc.connect(g)
      g.connect(ctxRef.current.destination)
      osc.start(now)
      osc.stop(now + duration)
    } catch {
      // Ignore audio errors silently
    }
  }, [settings.sound])

  const playKeyClick = useCallback(() => playTone(800, 0.02, 'sine', 0.08), [playTone])
  const playBackspace = useCallback(() => playTone(400, 0.015, 'sine', 0.06), [playTone])
  const playEnter = useCallback(() => playTone(1200, 0.03, 'sine', 0.10), [playTone])
  const playError = useCallback(() => playTone(100, 0.1, 'square', 0.12), [playTone])
  const playBootChime = useCallback(() => {
    if (!settings.sound || !ctxRef.current) return
    try {
      const osc = ctxRef.current.createOscillator()
      const g = ctxRef.current.createGain()
      const now = ctxRef.current.currentTime
      osc.type = 'sine'
      osc.frequency.setValueAtTime(200, now)
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.3)
      g.gain.setValueAtTime(0.15, now)
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
      osc.connect(g)
      g.connect(ctxRef.current.destination)
      osc.start(now)
      osc.stop(now + 0.3)
    } catch {
      // Ignore audio errors silently
    }
  }, [settings.sound])

  return (
    <AudioContextCtx.Provider value={{
      initAudio,
      playKeyClick,
      playBackspace,
      playEnter,
      playError,
      playBootChime,
    }}>
      {children}
    </AudioContextCtx.Provider>
  )
}

export function useAudioContext() {
  const ctx = useContext(AudioContextCtx)
  if (!ctx) throw new Error('useAudioContext must be used within AudioProvider')
  return ctx
}
