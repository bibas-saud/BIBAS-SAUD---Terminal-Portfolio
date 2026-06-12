import { useEffect, useRef } from 'react'
import { useTerminalContext } from '../context/TerminalContext'
import OutputLine from './OutputLine'
import InputArea from './InputArea'

function Terminal() {
  const { output } = useTerminalContext()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [output.length])

  return (
    <div className="h-full w-full overflow-y-auto" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14 }}>
      <div className="px-3 sm:px-4 pt-3 sm:pt-4">
        {output.map(o => (
          <OutputLine key={o.id} entry={o} />
        ))}
        <div ref={bottomRef} />
      </div>
      <InputArea />
    </div>
  )
}

export default Terminal
