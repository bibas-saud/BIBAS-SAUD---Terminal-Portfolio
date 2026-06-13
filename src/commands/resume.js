export default {
  description: 'Download my resume',
  category: 'navigation',
  handler: ({ addOutput }) => {
    addOutput('section', 'RESUME')
    addOutput('text', '')
    addOutput('text', '  Coming Soon')
    addOutput('text', '')
    addOutput('divider', '')
  },
}
