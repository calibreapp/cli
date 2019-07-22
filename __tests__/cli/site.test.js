const { runCLI } = require('../utils')

test('missing site argument', async () => {
  const out = await runCLI({ args: 'site pages', testForError: true })
  expect(out).toMatchSnapshot()
})

test('missing site argument value', async () => {
  const out = await runCLI({ args: 'site pages --site', testForError: true })
  expect(out).toMatchSnapshot()
})
