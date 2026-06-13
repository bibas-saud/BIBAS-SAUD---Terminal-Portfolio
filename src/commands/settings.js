export default {
  description: 'Terminal settings',
  category: 'system',
  handler: ({ addOutput, updateSettings, settings, args, openMenu }) => {
    if (args && args.length > 0) {
      addOutput('section', 'SETTINGS')
      addOutput('text', '')
      const sub = args[0].toLowerCase()
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

    openMenu([
      { label: 'Sound', hint: settings.sound ? 'ON \u2192 OFF' : 'OFF \u2192 ON' },
      { label: 'Theme', hint: settings.theme === 'dark' ? 'dark \u2192 light' : 'light \u2192 dark' },
    ], (item, close) => {
      addOutput('section', 'SETTINGS')
      addOutput('text', '')
      if (item === 'Sound') {
        updateSettings({ sound: !settings.sound })
        addOutput('text', `  Sound ${!settings.sound ? 'enabled' : 'disabled'}.`)
      } else if (item === 'Theme') {
        const next = settings.theme === 'dark' ? 'light' : 'dark'
        updateSettings({ theme: next })
        addOutput('text', `  Theme set to ${next}.`)
      }
      addOutput('text', '')
      addOutput('divider', '')
      close()
    })
  },
}
