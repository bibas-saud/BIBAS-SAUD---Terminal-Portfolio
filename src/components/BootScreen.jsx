import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTerminalContext } from '../context/TerminalContext'
import { useAudio } from '../hooks/useAudio'
import { registerAllCommands } from '../commands/registry'

const LINES = [
  { service: 'BIOS',    text: 'Portfolio Terminal v1.0.0 (Build 2026)' },
  { service: 'KERNEL',  text: 'Initializing components...' },
  { service: 'SERVICE', text: 'Loading skills ............ [OK]' },
  { service: 'SERVICE', text: 'Fetching projects ......... [OK]' },
  { service: 'SERVICE', text: 'Loading stats ............. [OK]' },
  { service: 'NETWORK', text: 'Starting input service .... [OK]' },
  { service: 'READY',   text: 'System ready. Type "help" to begin.' },
]

const SERVICE_COLORS = {
  BIOS: 'var(--accent-purple)',
  KERNEL: 'var(--accent-orange)',
  SERVICE: 'var(--success-green)',
  NETWORK: 'var(--accent-purple)',
  READY: 'var(--accent-orange)',
}

function BootScreen() {
  const { registerCommands, setPhase, commandMap, addOutput, clearOutput, updateSettings, settings, phase } = useTerminalContext()
  const { initAudio, playBootChime } = useAudio()
  const containerRef = useRef(null)

  useEffect(() => {
    registerAllCommands(registerCommands)
    initAudio()

    const tl = gsap.timeline({
      onComplete: () => {
        playBootChime()
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          delay: 0.8,
          onComplete: () => {
            const cmd = commandMap.current.get('banner')
            if (cmd) cmd.handler({ addOutput, clearOutput, commandMap, updateSettings, settings })
            setPhase('ready')
          },
        })
      },
    })

    tl.fromTo('.boot-line', { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', stagger: 0.35 })

    return () => tl.kill()
  }, [])

  if (phase !== 'booting') return null

  return (
    <div ref={containerRef} className="h-full w-full flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="flex flex-col gap-1" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>
        {LINES.map((line, i) => (
          <div key={i} className="boot-line opacity-0">
            <span style={{ color: SERVICE_COLORS[line.service] }}>{'['}{line.service}{']'}</span>
            <span style={{ color: 'var(--fg-muted)' }}>  {line.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BootScreen
