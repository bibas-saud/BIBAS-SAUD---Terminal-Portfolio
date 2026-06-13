import { useEffect, useRef, useState } from 'react'
import { useTerminalContext } from '../context/TerminalContext'
import PromptLine from './PromptLine'
import InputField from './InputField'
import Suggestions from './Suggestions'
import Menu from './Menu'

const SUGGESTION_ITEM_HEIGHT = 28
const STATUS_BAR_HEIGHT = 26
const SUGGESTION_BUFFER = 4

function InputArea() {
  const { menuItems, suggestions } = useTerminalContext()
  const hasMenu = menuItems.length > 0
  const inputRowRef = useRef(null)
  const [showAbove, setShowAbove] = useState(false)

  useEffect(() => {
    if (suggestions.length === 0) {
      setShowAbove(false)
      return
    }

    function checkSpace() {
      if (!inputRowRef.current) return
      const rect = inputRowRef.current.getBoundingClientRect()
      const estimatedHeight = suggestions.length * SUGGESTION_ITEM_HEIGHT + SUGGESTION_BUFFER
      const spaceBelow = window.innerHeight - rect.bottom - STATUS_BAR_HEIGHT
      setShowAbove(spaceBelow < estimatedHeight)
    }

    checkSpace()
    window.addEventListener('resize', checkSpace)
    return () => window.removeEventListener('resize', checkSpace)
  }, [suggestions.length])

  useEffect(() => {
    if (suggestions.length > 0) {
      const container = document.querySelector('[data-suggestions-container]')
      if (container) {
        const targetIdx = Math.min(2, suggestions.length - 1)
        const target = container.children[targetIdx]
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
      }
    }
  }, [suggestions.length])

  return (
    <div className="flex flex-col" style={{
      padding: '4px 12px 12px',
      background: 'var(--bg-primary)',
    }}>
      <div
        ref={inputRowRef}
        className={showAbove ? 'order-2' : 'order-2 sm:order-1'}
        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        <PromptLine />
        <span style={{ color: 'var(--fg-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>~ %</span>
        <div style={{ flex: 1 }}>
          <InputField />
        </div>
      </div>
      <div className={showAbove ? 'order-1' : 'order-1 sm:order-2'}>
        {hasMenu ? <Menu /> : <Suggestions showAbove={showAbove} />}
      </div>
    </div>
  )
}

export default InputArea
