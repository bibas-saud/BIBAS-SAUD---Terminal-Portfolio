export default {
  description: 'Contact information',
  category: 'navigation',
  handler: ({ addOutput }) => {
    addOutput('section', 'CONTACT')
    addOutput('text', '')
    addOutput('text', '  Email    bibas@example.com')
    addOutput('text', '  GitHub   https://github.com/bibas')
    addOutput('text', '  LinkedIn https://linkedin.com/in/bibas')
    addOutput('text', '')
    addOutput('divider', '')
  },
}
