export default {
  description: 'Display visitor identity',
  category: 'system',
  handler: ({ addOutput }) => {
    addOutput('section', 'WHOAMI')
    addOutput('text', '')
    addOutput('text', '  visitor')
    addOutput('text', '')
    addOutput('divider', '')
  },
}
