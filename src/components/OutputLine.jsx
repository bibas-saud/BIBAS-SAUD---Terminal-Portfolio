import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

function TypewriterText({ text, delay }) {
  const [displayed, setDisplayed] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.15 })
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, 35)
      return () => clearInterval(interval)
    }, delay || 0)
    return () => clearTimeout(timeout)
  }, [text, delay])

  return <div ref={ref}>{displayed}</div>
}

function OutputLine({ entry }) {
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' })
  }, [])

  if (entry.type === 'input') {
    return (
      <div ref={ref} style={{ lineHeight: 1.6, padding: '2px 0' }}>
        <span style={{ color: 'var(--fg-muted)' }}>$ </span>
        <span style={{ color: 'var(--accent-purple)' }}>{entry.content}</span>
      </div>
    )
  }

  if (entry.type === 'error') {
    return (
      <div ref={ref} style={{ lineHeight: 1.6, color: 'var(--error-red)', padding: '2px 0 2px 16px', borderLeft: '2px solid var(--error-red)', margin: '2px 0 2px 8px' }}>
        {entry.content}
      </div>
    )
  }

  if (entry.type === 'ascii') {
    return (
      <div ref={ref} style={{ lineHeight: 1.2, fontSize: 12, color: 'var(--accent-orange)', whiteSpace: 'pre', padding: '4px 0 4px 8px' }}>
        {entry.content}
      </div>
    )
  }

  if (entry.type === 'typewriter') {
    return (
      <div ref={ref} style={{ padding: '2px 0 2px 16px', borderLeft: '2px solid var(--accent-dim)', margin: '2px 0 2px 8px' }}>
        <TypewriterText text={entry.content} delay={entry.delay} />
      </div>
    )
  }

  if (entry.type === 'link') {
    const links = Array.isArray(entry.content) ? entry.content : [entry.content]
    return (
      <div ref={ref} style={{ padding: '2px 0 2px 16px', margin: '2px 0 2px 8px' }}>
        {links.map((link, i) => (
          <div key={i} style={{ lineHeight: 1.6 }}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-purple)', textDecoration: 'underline', cursor: 'pointer' }}
              onClick={(e) => e.stopPropagation()}
            >
              {link.text || link.url}
            </a>
          </div>
        ))}
      </div>
    )
  }

  if (entry.type === 'section') {
    const dashCount = Math.max(4, 56 - entry.content.length)
    return (
      <div ref={ref} style={{ lineHeight: 1.6, color: 'var(--accent-orange)', padding: '4px 0 2px 8px', fontWeight: 500 }}>
        {'\u2500'.repeat(2)} {entry.content} {'\u2500'.repeat(dashCount)}
      </div>
    )
  }

  if (entry.type === 'divider') {
    return (
      <div ref={ref} style={{ lineHeight: 1.6, padding: '2px 0 2px 8px', color: 'var(--border)' }}>
        {'\u2500'.repeat(60)}
      </div>
    )
  }

  if (entry.type === 'bar') {
    const { label, value } = entry.content
    const barLen = 20
    const filled = Math.round((value / 100) * barLen)
    const bar = '\u2588'.repeat(filled) + '\u2591'.repeat(barLen - filled)
    return (
      <div ref={ref} style={{ lineHeight: 1.6, padding: '2px 0 2px 16px', borderLeft: '2px solid var(--accent-dim)', margin: '2px 0 2px 8px' }}>
        <span style={{ color: 'var(--fg-primary)' }}>{label.padEnd(24)}</span>
        <span style={{ color: 'var(--accent-orange)' }}>{bar}</span>
        <span style={{ color: 'var(--fg-muted)', marginLeft: 8 }}>{value}%</span>
      </div>
    )
  }

  if (entry.type === 'help-row') {
    const { name, desc } = entry.content
    return (
      <div ref={ref} style={{ lineHeight: 1.6, padding: '2px 0 2px 16px', borderLeft: '2px solid var(--accent-dim)', margin: '2px 0 2px 8px' }}>
        <span style={{ color: 'var(--fg-primary)' }}>{name.padEnd(16)}</span>
        <span style={{ color: 'var(--fg-muted)' }}>({desc})</span>
      </div>
    )
  }

  if (entry.type === 'label') {
    return (
      <div ref={ref} style={{ lineHeight: 1.6, padding: '2px 0 2px 16px', borderLeft: '2px solid var(--accent-dim)', margin: '2px 0 2px 8px', color: 'var(--accent-purple)', fontWeight: 500, textDecoration: 'underline' }}>
        {entry.content}
      </div>
    )
  }

  if (entry.type === 'text') {
    return (
      <div ref={ref} style={{ lineHeight: 1.6, padding: '2px 0 2px 16px', borderLeft: '2px solid var(--accent-dim)', margin: '2px 0 2px 8px' }}>
        {entry.content}
      </div>
    )
  }

  return (
    <div ref={ref} style={{ lineHeight: 1.6, padding: '2px 0 2px 16px', margin: '2px 0 2px 8px' }}>
      {entry.content}
    </div>
  )
}

export default OutputLine
