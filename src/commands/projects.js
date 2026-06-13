export default {
  description: 'My projects',
  category: 'navigation',
  handler: ({ addOutput }) => {
    addOutput('section', 'PROJECTS')
    addOutput('text', '')
    addOutput('text', '  Coming Soon')
    addOutput('text', '')
    addOutput('divider', '')
  },
}
