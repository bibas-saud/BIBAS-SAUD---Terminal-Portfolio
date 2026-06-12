import { useCallback } from 'react'
import { useTerminalContext } from '../context/TerminalContext'

const SUBCOMMANDS = {
  '/settings': ['/settings sound', '/settings theme'],
}

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

    let results = [...exact, ...starts, ...includes].slice(0, 8)

    for (const [root, subs] of Object.entries(SUBCOMMANDS)) {
      if (q.startsWith(root.toLowerCase()) || root.toLowerCase().startsWith(q)) {
        for (const sub of subs) {
          if (sub.toLowerCase().startsWith(q) && !results.includes(sub)) {
            results.push(sub)
          }
        }
      }
    }

    return results.slice(0, 8)
  }, [commandMap])

  return { getSuggestions }
}
