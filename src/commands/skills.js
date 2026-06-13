import skillsData from '../data/skills.json'

export default {
  description: 'My skills and expertise',
  category: 'navigation',
  handler: ({ addOutput, args, openMenu }) => {
    if (args && args.length > 0) {
      const sub = args[0].toLowerCase()
      if (sub === 'technical' || sub === 'tech') {
        showSkills(addOutput, 'technical')
      } else if (sub === 'soft') {
        showSkills(addOutput, 'soft')
      } else {
        addOutput('section', 'SKILLS')
        addOutput('text', '')
        addOutput('text', '  Unknown category. Use: /skills technical | /skills soft')
        addOutput('text', '')
        addOutput('divider', '')
      }
      return
    }

    openMenu([
      { label: 'Technical Skills' },
      { label: 'Soft Skills' },
    ], (item, close) => {
      if (item === 'Technical Skills') {
        showSkills(addOutput, 'technical')
      } else {
        showSkills(addOutput, 'soft')
      }
      close()
    })
  },
}

function showSkills(addOutput, type) {
  const keys = type === 'technical'
    ? ['AI Orchestration', 'Backend and Database', 'Frontend and Languages', 'Tools and DevOps']
    : ['Soft Skills']

  addOutput('section', 'SKILLS')
  addOutput('text', '')

  for (const key of keys) {
    const items = skillsData[key]
    if (!items) continue
    addOutput('label', key)
    addOutput('text', `  ${items.map(s => `[${s}]`).join(' ')}`)
    addOutput('text', '')
  }

  addOutput('divider', '')
}
