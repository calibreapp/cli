import { styleText } from 'node:util'
import { marked } from 'marked'
import markedTerminal from 'marked-terminal'

const view = markdownReport => {
  marked.setOptions({
    headerIds: false,
    mangle: false,

    renderer: new markedTerminal({
      emoji: true,
      tab: 2,
      paragraph: text => styleText('reset', text),
      table: text => styleText('reset', text),
      heading: text => styleText(['bold', 'magenta'], text),
      href: text => styleText('cyan', text),
      tableOptions: {
        style: {
          head: ['bold']
        }
      }
    })
  })

  return marked(markdownReport)
}

export default view
