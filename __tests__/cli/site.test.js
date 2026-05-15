import { runCLI } from '../utils'

test('missing subcommand', async () => {
  const out = await runCLI({ args: 'site', testForError: true })
  expect(out).toMatchSnapshot()
})
