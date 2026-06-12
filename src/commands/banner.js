const BANNER = `
██████╗ ██╗██████╗  █████╗ ███████╗    ███████╗ █████╗ ██╗   ██╗██████╗ 
██╔══██╗██║██╔══██╗██╔══██╗██╔════╝    ██╔════╝██╔══██╗██║   ██║██╔══██╗
██████╔╝██║██████╔╝███████║███████╗    ███████╗███████║██║   ██║██║  ██║
██╔══██╗██║██╔══██╗██╔══██║╚════██║    ╚════██║██╔══██║██║   ██║██║  ██║
██████╔╝██║██████╔╝██║  ██║███████║    ███████║██║  ██║╚██████╔╝██████╔╝
╚═════╝ ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ 
`

export default {
  description: 'Display welcome banner',
  category: 'system',
  handler: ({ addOutput }) => {
    addOutput('ascii', BANNER)
    addOutput('text', '')
    addOutput('typewriter', 'Welcome to my terminal portfolio.', { delay: 0 })
    addOutput('typewriter', 'Type "help" to see available commands.', { delay: 1500 })
  },
}
