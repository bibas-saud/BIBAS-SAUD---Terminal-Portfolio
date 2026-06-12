import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTerminalContext } from '../context/TerminalContext'
import SuggestionItem from './SuggestionItem'

function Suggestions() {
  const { suggestions, selectedSuggestionIndex, setInput, setSuggestions, executeCommand } = useTerminalContext()
  const containerRef = useRef(null)

  useEffect(() => {
    if (suggestions.length > 0 && containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' })
    }
  }, [suggestions.length])

  if (suggestions.length === 0) return null

  function handleClick(cmd) {
    setInput(cmd)
    executeCommand(cmd)
    setSuggestions([])
  }

  return (
    <div ref={containerRef} style={{
      border: '1px solid var(--border)',
      borderTop: 'none',
      background: 'var(--bg-secondary)',
      borderRadius: '0 0 4px 4px',
      overflow: 'hidden',
    }}>
      {suggestions.map((cmd, i) => (
        <SuggestionItem
          key={cmd}
          command={cmd}
          index={i}
          isSelected={i === selectedSuggestionIndex}
          onClick={handleClick}
        />
      ))}
    </div>
  )
}

export default Suggestions
