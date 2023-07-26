import { marked } from 'marked'
import markedTerminal from 'marked-terminal'

const view = test => {
  marked.setOptions({
    headerIds: false,
    mangle: false,
    link: '#3057f4',

    renderer: new markedTerminal({
      emoji: true,
      tab: 2
    })
  })

  return marked(test.markdownReport)
}

export default view
