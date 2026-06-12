export default {
  description: 'Show command history',
  category: 'system',
  handler: ({ addOutput, history }) => {
    addOutput('section', 'HISTORY')
    addOutput('text', '')

    if (history.length === 0) {
      addOutput('text', '  No commands in history yet.')
    } else {
      for (let i = 0; i < history.length; i++) {
        addOutput('text', `  ${String(i + 1).padStart(3)}  ${history[i]}`)
      }
    }

    addOutput('text', '')
    addOutput('divider', '')
  },
}
