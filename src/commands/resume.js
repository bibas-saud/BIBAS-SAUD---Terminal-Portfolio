export default {
  description: 'Download my resume',
  category: 'navigation',
  handler: ({ addOutput }) => {
    addOutput('section', 'RESUME')
    addOutput('text', '')
    addOutput('link', { url: '/resume.pdf', text: '  Download Resume (PDF)' })
    addOutput('text', '')
    addOutput('divider', '')
  },
}
