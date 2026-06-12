export default {
  description: 'Display current date and time',
  category: 'system',
  handler: ({ addOutput }) => {
    const now = new Date()
    addOutput('section', 'DATE')
    addOutput('text', '')
    addOutput('text', `  ${now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    })}`)
    addOutput('text', '')
    addOutput('divider', '')
  },
}
