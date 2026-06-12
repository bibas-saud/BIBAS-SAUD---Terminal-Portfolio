function SuggestionItem({ command, isSelected, index, onClick }) {
  return (
    <div
      onClick={() => onClick(command)}
      style={{
        padding: '4px 12px',
        cursor: 'pointer',
        background: isSelected ? 'var(--accent-dim)' : 'transparent',
        color: isSelected ? '#fff' : 'var(--fg-primary)',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 13,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-dim)'; e.currentTarget.style.color = '#fff' }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--fg-primary)'
        }
      }}
    >
      <span>{command}</span>
    </div>
  )
}

export default SuggestionItem
