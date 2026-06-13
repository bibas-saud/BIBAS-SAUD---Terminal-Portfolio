import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTerminalContext } from '../context/TerminalContext'

function Menu() {
  const { menuItems, menuIndex, confirmMenu, closeMenu } = useTerminalContext()
  const containerRef = useRef(null)

  useEffect(() => {
    if (menuItems.length > 0 && containerRef.current) {
      gsap.fromTo(containerRef.current, { opacity: 0, y: -4 }, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' })
    }
  }, [menuItems.length])

  if (menuItems.length === 0) return null

  function handleClick(i) {
    confirmMenu(i)
  }

  return (
    <div ref={containerRef} style={{
      border: '1px solid var(--border)',
      borderTop: 'none',
      background: 'var(--bg-secondary)',
      borderRadius: '0 0 4px 4px',
      width: 'fit-content',
      overflow: 'hidden',
    }}>
        {menuItems.map((item, i) => {
          const label = typeof item === 'object' ? item.label : item
          const hint = typeof item === 'object' ? item.hint : ''
          return (
            <div
              key={label}
              onClick={() => handleClick(i)}
              style={{
                padding: '4px 12px',
                cursor: 'pointer',
                background: i === menuIndex ? 'var(--accent-dim)' : 'transparent',
                color: i === menuIndex ? '#fff' : 'var(--fg-primary)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-dim)'
                e.currentTarget.style.color = '#fff'
                const hint = e.currentTarget.querySelector('[data-hint]')
                if (hint) hint.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                if (i !== menuIndex) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--fg-primary)'
                  const hint = e.currentTarget.querySelector('[data-hint]')
                  if (hint) hint.style.color = 'var(--fg-muted)'
                }
              }}
            >
              <span style={{ color: 'var(--accent-orange)', width: 14 }}>{i === menuIndex ? '\u25B6' : ''}</span>
              <span>{label}</span>
              {hint && <span data-hint style={{ color: i === menuIndex ? '#fff' : 'var(--fg-muted)', marginLeft: 'auto' }}>{hint}</span>}
            </div>
          )
        })}
    </div>
  )
}

export default Menu
