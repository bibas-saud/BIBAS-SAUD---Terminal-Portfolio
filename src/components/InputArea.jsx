import { useEffect } from 'react'
import { useTerminalContext } from '../context/TerminalContext'
import PromptLine from './PromptLine'
import InputField from './InputField'
import Suggestions from './Suggestions'
import Menu from './Menu'

function InputArea() {
  const { menuItems, suggestions } = useTerminalContext()
  const hasMenu = menuItems.length > 0

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
      <div className="order-2 sm:order-1" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <PromptLine />
        <span style={{ color: 'var(--fg-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>~ %</span>
        <div style={{ flex: 1 }}>
          <InputField />
        </div>
      </div>
      <div className="order-1 sm:order-2">
        {hasMenu ? <Menu /> : <Suggestions />}
      </div>
    </div>
  )
}

export default InputArea
