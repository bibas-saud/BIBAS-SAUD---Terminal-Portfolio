import { useCallback } from 'react'
import { useTerminalContext } from '../context/TerminalContext'

export function useSuggestions() {
  const { commandMap } = useTerminalContext()

  const getSuggestions = useCallback((value) => {
    if (!value) return []
    const keys = Array.from(commandMap.current.keys())
    const q = value.toLowerCase()

    const exact = []
    const starts = []
    const includes = []

    for (const key of keys) {
      const kl = key.toLowerCase()
      if (kl === q) {
        exact.push(key)
      } else if (kl.startsWith(q)) {
        starts.push(key)
      } else if (kl.includes(q)) {
        includes.push(key)
      }
    }

    return [...exact, ...starts, ...includes].slice(0, 8)
  }, [commandMap])

  return { getSuggestions }
}
