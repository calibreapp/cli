import marked from 'marked'
import markedTerminal from 'marked-terminal'

const view = test => {
  marked.setOptions({
    renderer: new markedTerminal({
      emoji: true,
      tab: 2
    })
  })

  return marked(test.markdown)
}

export default view
