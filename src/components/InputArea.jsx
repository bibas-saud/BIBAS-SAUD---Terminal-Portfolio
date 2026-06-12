import PromptLine from './PromptLine'
import InputField from './InputField'
import Suggestions from './Suggestions'

function InputArea() {
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
        <Suggestions />
      </div>
    </div>
  )
}

export default InputArea
