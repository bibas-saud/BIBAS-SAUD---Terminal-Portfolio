import projects from '../data/projects.json'

export default {
  description: 'My projects',
  category: 'navigation',
  handler: ({ addOutput }) => {
    addOutput('section', 'PROJECTS')
    addOutput('text', '')

    for (const p of projects) {
      addOutput('text', `  ${p.name}`)
      addOutput('text', `    ${p.description}`)
      addOutput('link', { url: p.url, text: `    ${p.url}` })
      addOutput('text', '')
    }

    addOutput('divider', '')
  },
}
