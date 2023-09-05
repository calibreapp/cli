import chalk from 'chalk'
import { marked } from 'marked'
import markedTerminal from 'marked-terminal'

const view = markdownReport => {
  marked.setOptions({
    headerIds: false,
    mangle: false,

    renderer: new markedTerminal({
      emoji: true,
      tab: 2,
      paragraph: chalk.reset,
      table: chalk.reset,
      heading: chalk.bold.hex('#5f5fff'),
      href: chalk.hex('#008080'),
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
