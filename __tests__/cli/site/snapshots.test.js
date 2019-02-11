const { runCLI } = require('../../utils')

test('missing site argument', () => {
  return runCLI({ args: 'site snapshots', testForError: true }).then(stdout => {
    expect(stdout).toMatchSnapshot()
  })
})

test('missing site argument value', () => {
  return runCLI({ args: 'site snapshots --site', testForError: true }).then(
    stdout => {
      expect(stdout).toMatchSnapshot()
    }
  )
})
