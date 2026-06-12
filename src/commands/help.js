export default {
  description: 'List all available commands',
  category: 'system',
  handler: ({ addOutput, commandMap }) => {
    addOutput('section', 'AVAILABLE COMMANDS')

    const categories = {}
    for (const [name, cmd] of commandMap.current.entries()) {
      const cat = cmd.category || 'other'
      if (!categories[cat]) categories[cat] = []
      categories[cat].push({ name, desc: cmd.description })
    }

    for (const [cat, cmds] of Object.entries(categories)) {
      addOutput('text', '')
      addOutput('label', `  ${cat}`)
      for (const cmd of cmds) {
        addOutput('help-row', { name: `    ${cmd.name}`, desc: cmd.desc })
      }
    }

    addOutput('text', '')
    addOutput('divider', '')
  },
}
