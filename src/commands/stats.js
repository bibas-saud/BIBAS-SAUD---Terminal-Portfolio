import stats from '../data/stats.json'

export default {
  description: 'Display skill statistics',
  category: 'info',
  handler: ({ addOutput }) => {
    addOutput('section', 'STATS')
    addOutput('text', '')
    for (const [label, value] of Object.entries(stats)) {
      addOutput('bar', { label, value })
    }
    addOutput('text', '')
    addOutput('divider', '')
  },
}
