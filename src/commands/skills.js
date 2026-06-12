import skillsData from '../data/skills.json'

export default {
  description: 'My technical skills',
  category: 'navigation',
  handler: ({ addOutput }) => {
    addOutput('section', 'SKILLS')
    addOutput('text', '')
    for (const [category, items] of Object.entries(skillsData)) {
      addOutput('text', `  ${category}`)
      addOutput('text', `    ${items.map(s => `[${s}]`).join(' ')}`)
      addOutput('text', '')
    }
    addOutput('divider', '')
  },
}
