import { useEffect, useRef, useState } from 'react'
import { useTerminalContext } from '../context/TerminalContext'

function StatusBar() {
  const { settings, updateSettings, commandCount } = useTerminalContext()
  const startTime = useRef(Date.now())
  const [uptime, setUptime] = useState('00:00:00')

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000)
      const h = Math.floor(elapsed / 3600)
      const m = Math.floor((elapsed % 3600) / 60)
      const s = elapsed % 60
      setUptime(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      height: 26,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 8px',
      borderTop: '1px solid var(--border)',
      fontSize: 10,
      color: 'var(--fg-muted)',
      background: 'var(--bg-secondary)',
      fontFamily: 'JetBrains Mono, monospace',
      flexShrink: 0,
      userSelect: 'none',
    }}>
      <span
        onClick={() => updateSettings({ sound: !settings.sound })}
        style={{ cursor: 'pointer', color: settings.sound ? 'var(--success-green)' : 'var(--error-red)' }}
      >
        {'['}{settings.sound ? 'ON' : 'OFF'}{']'}
      </span>
      <div style={{ display: 'flex', gap: 6 }}>
        <span className="hidden sm:inline">uptime</span>
        <span>{uptime}</span>
        <span>cmds {commandCount}</span>
        <span style={{ color: 'var(--accent-orange)' }}>{settings.theme}</span>
      </div>
    </div>
  )
}

export default StatusBar
