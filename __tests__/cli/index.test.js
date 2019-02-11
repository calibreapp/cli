const { runCLI } = require('../utils')

test('calibre --help', () => {
  return runCLI({ args: '--help' }).then(stdout => {
    expect(stdout).toMatchSnapshot()
  })
})
