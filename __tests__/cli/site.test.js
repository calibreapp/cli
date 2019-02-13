const { runCLI } = require('../utils')

test('missing site argument', () => {
  return runCLI({ args: 'site pages', testForError: true }).then(stdout => {
    expect(stdout).toMatchSnapshot()
  })
})

test('missing site argument value', () => {
  return runCLI({ args: 'site pages --site', testForError: true }).then(
    stdout => {
      expect(stdout).toMatchSnapshot()
    }
  )
})
