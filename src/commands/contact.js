export default {
  description: 'Contact information',
  category: 'navigation',
  handler: ({ addOutput, openMenu }) => {
    openMenu([
      { label: 'Email' },
      { label: 'GitHub' },
      { label: 'LinkedIn' },
    ], (item, close) => {
      if (item === 'GitHub') {
        window.open('https://github.com/bibas-saud', '_blank')
        close()
      } else if (item === 'LinkedIn') {
        window.open('https://www.linkedin.com/in/bibas-saud-607b19282', '_blank')
        close()
      } else if (item === 'Email') {
        openMenu([
          { label: 'View Email' },
          { label: 'Send Email' },
        ], (sub, subClose) => {
          if (sub === 'View Email') {
            addOutput('section', 'CONTACT')
            addOutput('text', '')
            addOutput('text', '  bibas9818@gmail.com')
            addOutput('text', '')
            addOutput('divider', '')
            subClose()
          } else {
            window.open('mailto:bibas9818@gmail.com', '_blank')
            subClose()
          }
        })
      }
    })
  },
}
