export default {
  description: 'Terminal settings',
  category: 'system',
  handler: ({ addOutput, updateSettings, settings, args }) => {
    if (args && args.length > 0) {
      const sub = args[0].toLowerCase()
      addOutput('section', 'SETTINGS')
      addOutput('text', '')
      if (sub === 'sound') {
        updateSettings({ sound: !settings.sound })
        addOutput('text', `  Sound ${!settings.sound ? 'enabled' : 'disabled'}.`)
      } else if (sub === 'theme') {
        const next = settings.theme === 'dark' ? 'light' : 'dark'
        updateSettings({ theme: next })
        addOutput('text', `  Theme set to ${next}.`)
      } else {
        addOutput('text', `  Unknown setting: ${sub}`)
        addOutput('text', '  Usage: /settings [sound|theme]')
      }
      addOutput('text', '')
      addOutput('divider', '')
      return
    }

    addOutput('section', 'SETTINGS')
    addOutput('text', '')
    addOutput('text', `  Sound ${settings.sound ? 'ON' : 'OFF'}        /settings sound`)
    addOutput('text', `  Theme ${settings.theme}    /settings theme`)
    addOutput('text', '')
    addOutput('divider', '')
  },
}
