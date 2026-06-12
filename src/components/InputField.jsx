import { useRef, useEffect } from 'react'
import { useTerminalContext } from '../context/TerminalContext'
import { useKeyboard } from '../hooks/useKeyboard'

function InputField() {
  const { input, suggestions } = useTerminalContext()
  const inputRef = useRef(null)
  const { handleKeyDown, handleChange, handleBackspaceKeyUp } = useKeyboard(inputRef)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const onAnyClick = () => inputRef.current?.focus()
    document.addEventListener('click', onAnyClick)
    return () => document.removeEventListener('click', onAnyClick)
  }, [])

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 0 }}>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleBackspaceKeyUp}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--fg-primary)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 14,
          caretColor: 'var(--accent-orange)',
          padding: 0,
          margin: 0,
        }}
      />
    </div>
  )
}

export default InputField
