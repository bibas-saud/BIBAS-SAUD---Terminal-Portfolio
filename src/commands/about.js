import aboutData from '../data/about.json'

export default {
  description: 'About me',
  category: 'navigation',
  handler: ({ addOutput }) => {
    addOutput('section', 'ABOUT')
    addOutput('text', '')
    addOutput('text', `  ${aboutData.name}`)
    addOutput('text', `  ${aboutData.title}`)
    addOutput('text', '')
    for (const paragraph of aboutData.bio) {
      addOutput('text', `  ${paragraph}`)
      addOutput('text', '')
    }
    addOutput('divider', '')
  },
}
