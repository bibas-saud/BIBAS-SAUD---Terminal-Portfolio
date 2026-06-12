export default {
  description: 'Clear terminal screen',
  category: 'system',
  handler: ({ clearOutput }) => {
    clearOutput()
  },
}
